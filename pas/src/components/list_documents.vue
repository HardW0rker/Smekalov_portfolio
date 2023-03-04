<template>
  <Warning
  :message = "message_warm"
  v-if = "message_warm"
  @answer="answer"/>
  <div class="wraper-list">
    <div class="list">
      <p class="list__header">Список документов</p>
      <div class="list__search">
        <input class="list__search-input" type="text" placeholder="Найти" v-model ="search_input" @keyup = "drow" @keyup.enter = "search">
        <img class="list__search-icon" src="@/assets/search.svg" @click = "search">
      </div>
      <div class="list__name">
        <div 
        class="list__name-document" 
        v-for = "item in documents" 
        v-bind:key = "item"
        :class = "{'active-document' : (activedoc == item.document_id)}"
        @click = "click_document(item.document_id)"
        >
           {{item.name}}
        </div>
      </div>
      <div class="list__add-document" :class = "{'active-add-document' : active_add_doc}">
        <input class="list__add-document-input" type="text" placeholder="Добавить документ" v-model="add_doc" @keyup.enter="new_doc">
        <img v-if="!add_doc && active_add_doc == 0" class="list__add-document-icon" src="@/assets/add.svg">
        <img v-if="add_doc && active_add_doc == 0" class="list__add-document-icon" src="@/assets/add-active.svg" @click = "new_doc">
        <img v-if="active_add_doc" class="list__add-document-icon-active" src="@/assets/add-active.svg" @click = "dell_doc">
      </div>
    </div>
    <div class="logout">
      <p class="logout__text">Выйти</p>
    </div>
  </div>
</template>

<script>
import Warning from "@/components/warning"

export default {
  name: 'App',
  components: {
    Warning
  },
  props:{
    name_doc:{
    },
  },
  data(){
    return{
      documents:[],
      search_input:'',
      activedoc: -1,
      add_doc:'',
      active_add_doc: 0,
      message_warm:'',
    }
  },
  computed:{
  },
  methods:{
    load_data(){
       this.documents = this.name_doc;
    },
    search(){
      this.documents = this.name_doc.filter(item => {
          return item.name.toLowerCase().includes(this.search_input.toLowerCase())
      })
    },
    drow(){
      if(this.search_input == ''){
        this.search();
      }
    },
    click_document(id){
      if(this.active_add_doc){
        document.querySelector('.list__add-document-input').disabled = false;
        this.message_warm = {'message':'При закрытии документа данные не сохряняться','num':id};
      }
      else{
        this.add_doc = '';
        this.active_add_doc = 0;
        if(this.activedoc == id){
          this.activedoc = -1;
          this.$emit('clickDoc', -1);
        }
        else{
          this.activedoc = id;
          this.$emit('clickDoc', id);
        }
      }
    },
    new_doc(){
      if(this.add_doc!=0){
        document.querySelector('.list__add-document-input').disabled = true;
        this.active_add_doc = 1;
        this.activedoc = -1;
        this.$emit('newDoc', this.add_doc);
      }
    },
    dell_doc(){
      document.querySelector('.list__add-document-input').disabled = false;
      this.message_warm = {'message':'При закрытии документа данные не сохряняться','num':-3};
    },
    answer(answer,num){
      this.message_warm='';
      if(answer==1 && num == -3){
        this.active_add_doc = 0;
        this.$emit('clickDoc', -1);
        this.add_doc = '';
      }
      if(answer==1 && num != -3){
        this.add_doc = '';
        this.active_add_doc = 0;
        if(this.activedoc == num){
          this.activedoc = -1;
          this.$emit('clickDoc', -1);
        }
        else{
          this.activedoc = num;
          this.$emit('clickDoc', num);
        }
      }
    }
  },
  mounted(){
  }
}

</script>

<style scoped>
  .wraper-list{
    height: calc(100%);
    display: flex;
    flex-direction: column;
  }
  .list{
    flex: 1 1;
    min-height: 200px;
    width: calc(100%);
    background: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 0px;
    transition: 1s;
  }
  .list__header{
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #1B2949;
    transition: 1s;
  }
  @media (max-height: 1000px) or (max-width: 1500px) {
    .list{
      gap: 16px;
    }
    .list__header{
      font-size: 20px;
      line-height: 22px;
    }
  }
  .list__search{
    border-radius: 10px;
    margin: 20px 20px 0px 20px;
    overflow: hidden;
    display: flex;
    padding: 7px 15px;
    justify-content: space-between;
    align-items: center;
    background: #F6F6F6;
    transition: 1s;
  }
  .list__search-input{
    width: 100%;
    background: transparent;
    border: none;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    outline:none;
    color: #1B2949;
    transition: 1s;
  }
  .list__search-input::placeholder{
    color:#A5ABBA;
  }
  .list__search-icon{
    transition: 1s;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  @media (max-height: 1000px) or (max-width: 1500px) {
    .list__search{
      margin: 16px 16px 0px 16px;
    }
    .list__search-input{
      font-size: 16px;
      line-height: 18px;
    }
    .list__search-icon{
      width: 14px;
      height: 14px;
    }
  }
  .list__name{
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .list__name::-webkit-scrollbar{
    color: transparent;
     width: 10px;
  }
  .list__name::-webkit-scrollbar-thumb{
    border-radius: 20px;
    background:#E5E5E5 ;
  }
  .list__name-document{
    padding: 15px 40px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    border-left: 4px solid transparent;
    color: #757F97;
    cursor: pointer;
    transition: border-left 0.35s,background 0.35s,color 0.35s, font-size 1s,line-height 1s,padding 1s;
  }
  @media (max-height: 1000px) or (max-width: 1500px) {
    .list__name-document{
      font-size: 16px;
      line-height: 18px;
      padding: 10px 30px;
    }
  }
  .active-document{
    background: #F9F9FC;
    border-left: 4px solid #7B57DF;
    color: #1B2949
  }
  .list__add-document{
    margin-top: -20px;
    background: #FAFAFA;
    border-left: 4px solid transparent;
    padding: 15px 40px;
    display: flex;
    transition: padding 1s;
  }
  .active-add-document{
    background: #F9F9FC;
    border-left: 4px solid #7B57DF;
    color: #1B2949
  }
  .list__add-document-input{
    font-style: normal;
    background: transparent;
    border: none;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;
    outline:none;
    color:  #1B2949;
    transition: 1s;
  }
  @media (max-height: 1000px) or (max-width: 1500px) {
    .list__add-document{
      padding: 10px 30px;
    }
    .list__add-document-input{
      font-size: 16px;
      line-height: 18px;
    }
  }
  .list__add-document-input::placeholder{
    color:#D4D8E1;
  }
  .list__add-document-icon{
    cursor: pointer;
  }
  .list__add-document-icon-active{
    transform: rotate(45deg);
     cursor: pointer;
  }
  .logout{
    padding: 20px 40px;
  }
  .logout__text{
    font-style: normal;
    cursor: pointer;
    font-weight: 500;
    width: fit-content; 
    font-size: 20px;
    line-height: 23px;
    color: #7B57DF;
  }
  @media (max-height: 1000px) or (max-width: 1500px) {
    .logout{
      padding: 20px 30px;
    }
    .logout__text{
      font-size: 16px;
      line-height: 18px;
    }
  }
</style>
