<template>
  <div class="info">
   <div class="info__text">

     <div class="info__text-frame">
       <p class="info__text-frame-title">Автор документа:</p>
       <input type="text" class="info__text-frame-subtitle subtitle-input" v-model="new_data.author">
     </div>
     <div class="info__text-frame">
       <p class="info__text-frame-title">Контрагент:</p>
       <input type="text" class="info__text-frame-subtitle subtitle-input" v-model="new_data.counterparty" >
     </div>
     <div class="info__text-frame">
       <p class="info__text-frame-title">Дата:</p>
       <p class="info__text-frame-subtitle">{{data.date}}</p>
     </div>
      
      <div class="info__text-area">
        <p class="info__text-frame-title">Описание:</p>
        <div class="info__text-frame-text">
          <textarea name="" class="info__text-area-subtitle" v-model="new_data.description"></textarea>
        </div>
      </div>
      <div class="info__text-area">
        <p class="info__text-frame-title">Комментарий:</p>
        <div class="info__text-frame-text">
         <textarea name="" class="info__text-area-subtitle" v-model="new_data.comment"></textarea>
        </div>
      </div>

   </div>
   <div class="info__button">
    <div class="info__button-top">
      <div class="info__button-top-btn" @click="openPurchases">Открыть закупку</div>
      <div class="info__button-top-btn" @click="openDocumets">Дополнительные документы</div>  
    </div>
    <div class="info__button-save" @click="save">Сохранить</div>
   </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  props:{
    data:{
    },
  },
  data(){
    return{
      new_data:{}
    }
  },
  methods:{
    openPurchases(){
      this.$emit('openPurchases');
    },
    openDocumets(){
      this.$emit('openDocumets');
    },
    save(){
      console.log(this.new_data);
    }
  },
  mounted(){
    this.new_data = this.data
  }
}

</script>

<style scoped>
.info{
  height: calc(100% - 120px);
  transition: 1s;
  padding: 60px 120px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  gap: calc(8%);
}
@media (max-height: 1000px){
  .info{
    height: calc(100% - 80px);
    padding: 40px 120px;
  }
}
@media (max-height: 800px){
  .info{
    height: calc(100% - 40px);
    padding: 20px 120px;
  }
}
@media (max-width: 1500px) {
  .info{
    height: calc(100% - 40px);
    padding: 20px 40px;
  }
}
.info__text{
  flex: 1 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
@media (max-width: 1500px) {
  .info__text{
    gap: 10px;
  }
}
.info__text-frame{
  display: flex;
  gap: 20px;
}
.info__text-frame-title{
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  min-width: 160px;
  color: #757F97;
}
.info__text-frame-subtitle {
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #384460;
}
.subtitle-input{
  width: 100%;
  border: none;
  border-bottom: 1px solid #E4E4E4;
  padding: 5px 10px;
  outline: none;
  transition: border-bottom 0.5s,background 0.5s, width 1s;
}
.subtitle-input:hover{
  border-bottom: 1px solid #ADADAD;
}
.subtitle-input:focus{
  border-bottom: 1px solid #7B57DF;
  background: #FAFAFA ;
}
.info__text-area{
  height: calc(100%);
  display: flex;  
  overflow: auto;
  flex-direction: column;
  gap: 5px;
}
.info__text-frame-text{
  height: 100%;
  border: 2px solid #E4E4E4;
  border-radius: 10px;
  overflow: auto;
  transition: 0.5s;
}
.info__text-frame-text:hover{
  border: 2px solid #ADADAD;
}
.info__text-frame-text:focus-within {
  border: 2px solid #7B57DF;
  background: #FAFAFA ;
}
.info__text-area-subtitle{
  border: none;
  background: transparent;
  padding: 10px 15px;
  width: calc(100% - 40px);
  height: calc(100% - 44px);
  outline: none;
  resize: none;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  color: #384460;
}
.info__button{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info__button-top{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.info__button-top-btn{
  cursor: pointer;
  border: 2px solid #7B57DF;
  width: 250px;
  text-align: center;
  border-radius: 12px; 
  padding: 15px 10px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #7B57DF;
  transition: 1s;
}
.info__button-save{
  cursor: pointer;
  background: #5DC983;
  border-radius: 12px;
  padding: 15px;
  width: 250px;
  text-align: center;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  transition: 1s;
}
@media (max-width: 1500px) {
  .info__button-top-btn{
    width: 170px;
  }
  .info__button-save{
    width: 170px;
  }
}


</style>
