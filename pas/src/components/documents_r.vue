<template>
  <div class="wraper-documents">
    <div class="back-btn" @click ="closeDocumets">
        <img class="back-btn__icon" src="@/assets/arrow.svg">
        <div class="back-btn__icon-text">Вернуться на главную</div>
    </div>
    <div class="documents">
      <p class="documents__header">Дополнительные документы:</p>
      <div class="documents__list">
        <!-- <div class="documents__list-item" v-for = "item in new_data.documents" v-bind:key = "item">
          <img src="@/assets/dash.svg" alt="" class="documents__list-item-icon">
          <p class="documents__list-item-text">{{item.filename}} <img src="@/assets/download.svg" alt="" class="documents__list-item-text-icon" @click="download_file(item)"></p>
        </div> -->
        <div class="documents__list-item" v-for = "item in new_data.documents" v-bind:key = "item">
          <img src="@/assets/dash.svg" alt="" class="documents__list-item-icon">
          <p class="documents__list-item-text"> {{item.filename}}
           <a :href="'http://192.168.1.175:8080/get-files?file_id='+item.file_id">
            <img src="@/assets/download.svg" alt="" class="documents__list-item-text-icon"/>
            </a>
          </p>
        </div>
        <div class="documents__list-item">
          <input type="file" class = "documents__list-item-input" id="input" @change = "addfile($event)">
          <img src="@/assets/dash-new.svg" alt="" class="documents__list-item-icon">
          <label for="input">
            <p class="documents__list-item-text new-item">Добавить документ<img src="@/assets/add.svg" alt="" class="documents__list-item-text-icon"></p>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  props:{
    data:{
    },
  },
  data(){
    return{
      file:{},
      new_data:{}
    }
  },
  methods:{
    closeDocumets(){
      this.$emit('openMain');
    },
    addfile(event){
      this.file = event.target.files[0]
      let formData = new FormData();
      formData.append('document', this.file);
      formData.append('document_id', this.new_data.document_id);
      formData.append('filename', this.file.name);
      this.new_data.documents.push({'filename':this.file.name, 'formdata':formData})
      console.log(this.new_data)
    }
  },
  mounted(){
    this.new_data = this.data
  }
}

</script>

<style scoped>
.wraper-documents{
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.back-btn{
  cursor: pointer;
  background: #7B57DF;
  width: 220px;
  border-radius: 12px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.back-btn__icon{
  width: 24px;
  height: 24px;
}
.back-btn__icon-text{
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
}
.documents{
  overflow-x: hidden;
  padding: 30px;
  border-radius: 10px;
  background: #fff;
  display:flex;
  width: fit-content; 
  flex-direction: column;
  gap: 20px;
}
.documents::-webkit-scrollbar{
    background: #ffffff;
    width: 10px;
  }
.documents::-webkit-scrollbar-thumb{
  border-radius: 20px;
  background:#E5E5E5 ;
}
.documents__header{
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #384460;
}
.documents__list{
  width: fit-content;
  display: flex; 
  flex-direction: column;
  gap: 15px;
}
.documents__list-item{
  display: flex;
  width: fit-content; 
  gap: 10px;
  align-items: center;
}
.documents__list-item-icon{
  width: 24px;
  height: 24px;
}
.documents__list-item-text{
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #384460;
  background: #EEF1F7;
  border-radius: 5px;
  padding: 7px 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.documents__list-item-text-icon{
  width: 20px;
  height: 20px;
}
.new-item{
  color: #D4D8E1;
  background: #FAFAFA;
}
.documents__list-item-input{
  display: none;
}
</style>
