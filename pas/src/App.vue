<template>
  <div class="wraper">
    <div class="list-documents">
      <ListDocuments 
      ref="childComponent"
      :name_doc = "name_doc"
      @clickDoc="clickDoc"
      @newDoc="createDoc"
      />
    </div>
    <div class="main">
      <div class="main__header">
        <HeaderDocument 
        :data = "select_doc"
        v-if = "select_doc.document_id != -1"/>
      </div>
      <div class="main__info">
        <MainInfo
         :data = "select_doc"
         :page = "page"
         @select_page = "select_page"
         v-if = "select_doc.document_id != -1"/>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import path from './config.js';
import ListDocuments from "@/components/list_documents"
import HeaderDocument from "@/components/header_document"
import MainInfo from "@/components/main"


export default {
  name: 'App',
  components: {
    ListDocuments,HeaderDocument,MainInfo
  },
  data(){
    return{
      select_doc:{'document_id': -1,'purchases':[]},
      page:1,
      name_doc:{}
    }
  },
  methods:{
    split_date(){
      var date = this.select_doc.date;
      this.select_doc.date = `${date.split('-')[2]}.${date.split('-')[1]}.${date.split('-')[0]}`
      this.select_doc.points[0].date = `${this.select_doc.points[0].date.split('-')[2]}.${this.select_doc.points[0].date.split('-')[1]}.${this.select_doc.points[0].date.split('-')[0]}`
      this.select_doc.points[1].date = `${this.select_doc.points[1].date.split('-')[2]}.${this.select_doc.points[1].date.split('-')[1]}.${this.select_doc.points[1].date.split('-')[0]}`
      this.select_doc.points[2].date = `${this.select_doc.points[2].date.split('-')[2]}.${this.select_doc.points[2].date.split('-')[1]}.${this.select_doc.points[2].date.split('-')[0]}`
      this.select_doc.points[3].date = `${this.select_doc.points[3].date.split('-')[2]}.${this.select_doc.points[3].date.split('-')[1]}.${this.select_doc.points[3].date.split('-')[0]}`
    },
    async get_data(){
      await axios
        .get(path.path_list_doc())
        .then(response => (this.name_doc = response.data));
      this.$refs.childComponent.load_data();
    },
    clickDoc(id){
      this.page = 1;
      if(id == -1){
        this.select_doc = {};
        this.select_doc.document_id= -1;
      }
      else{
        axios
          .post(path.path_view_doc(),{
            doc_id: id
          })
          .then(response => (
            this.select_doc = response.data.viewDoc,
            console.log(response.data.viewDoc),
            this.split_date()))
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    createDoc(name){
      this.page = 1;
      this.select_doc = {}; 
      this.select_doc.purchases = [];
      this.select_doc.document_id = -2;
      this.select_doc.name = name;
      var date = new Date();
      var month = parseInt(date.getMonth())+1
      this.select_doc.date = `${date.getDate()}.${('00'+month).slice(-2)}.${date.getFullYear()}`;
      this.select_doc.points = [
        {'point_id':1,'date':"",'status':false,'text':'Этап первый'},
        {'point_id':2,'date':"",'status':false,'text':'Этап второй'},
        {'point_id':3,'date':"",'status':false,'text':'Этап третий'},
        {'point_id':4,'date':"",'status':false,'text':'Этап четвёртый'},
      ];
      this.select_doc.documents = [];
    },
    select_page(page){
      this.page = page;
    }
  },
  mounted(){
     this.get_data();
  }
}

</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

*{
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}
body{
}
.wraper{
  height: 100vh;
  min-width: 1200px;
  min-height: 750px;
  display: flex;
}
.list-documents{
  width: 335px;
  height: 100%;
  transition: width 1s;
}
@media (max-height: 1000px) or (max-width: 1500px) {
  .list-documents{
    width: 280px;
  }
}
.main{
  flex: 1 1;
  height: calc(100% - 80px);
  background: #F9F9FC;
  padding: 40px 60px;
  display: flex;
  flex-direction:column;
  gap: 30px;
  transition: 1s;
}
.main__header{
  flex: 0 0;
}
.main__info{
  flex: 1 1;
  min-height: 200px;
}
@media (max-height: 1000px) or (max-width: 1500px) {
  .main{
    height: calc(100% - 40px);
    padding: 20px 30px;
  }
}
</style>
