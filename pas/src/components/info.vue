<template>
  <div class="info">
   <div class="info__text">

     <div class="info__text-frame">
       <p class="info__text-frame-title">Автор документа:</p>
       <p class="info__text-frame-subtitle">{{data.author}}</p>
     </div>
     <div class="info__text-frame">
       <p class="info__text-frame-title">Контрагент:</p>
       <p class="info__text-frame-subtitle">{{data.counterparty}}</p>
     </div>
     <div class="info__text-frame">
       <p class="info__text-frame-title">Дата:</p>
       <p class="info__text-frame-subtitle">{{data.date}}</p>
     </div>
      
      <div class="info__text-area">
        <p class="info__text-frame-title">Описание:</p>
        <div class="info__text-frame-text">
          <p class="info__text-area-subtitle">{{data.description}}</p>
        </div>
      </div>
      <div class="info__text-area">
        <p class="info__text-frame-title">Комментарий:</p>
        <div class="info__text-frame-text">
          <p class="info__text-area-subtitle">{{data.comment}}</p>
        </div>
      </div>

   </div>
   <div class="info__button">
    <div class="info__button-top">
      <div class="info__button-top-btn" @click="openPurchases">Открыть закупку</div>
      <div class="info__button-top-btn" @click="openDocumets">Дополнительные документы</div>  
    </div>
    <div class="info__button-save">Сохранить</div>
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
    }
  },
  methods:{
    openPurchases(){
      this.$emit('openPurchases');
    },
    openDocumets(){
      this.$emit('openDocumets');
    }
  },
  mounted(){
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
  min-width: 160px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #757F97;
}
.info__text-frame-subtitle{
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #384460;
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
  border-radius: 10px;
  border: 2px solid #E4E4E4;
  overflow: auto;
}
.info__text-area-subtitle{
  padding: 10px 15px;
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
  cursor: pointer;
}
.info__button-save{
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
  cursor: pointer;
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
