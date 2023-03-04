<template>
  <div class="purchases-wraper">
    <div class="back-btn" @click ="closePurchases">
      <img class="back-btn__icon" src="@/assets/arrow.svg">
      <div class="back-btn__icon-text">Вернуться на главную</div>
    </div>
    <div class="table">
      <div class="table__header">
        <div class="table__header-item">Наименование</div>
        <div class="table__header-item">Еденицы изделия</div>
        <div class="table__header-item">Цена за шт.</div>
        <div class="table__header-item">Сумма</div>
        <div class="table__header-item">Поставщик</div>
      </div>
      <div class="table__frame">
        <div class="table__frame-items">
           <TableItem 
            :data = "item"
            v-for = "item in data.purchases" 
            v-bind:key = "item"/>
        </div>
       <!--  <div class="table__frame-new">Добавить строку +</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import TableItem from "@/components/purchases-item"
export default {
  name: 'App',
  components: {
    TableItem
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
    closePurchases(){
      this.$emit('openMain');
    },
  },
  mounted(){
  }
}

</script>
  
<style scoped>
.purchases-wraper{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
  transition: 1s;
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
.table{
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  overflow: hidden;
}
.table__header{
  display: flex;
  justify-content: space-between;
  gap: 5px;
}
.table__header-item{
  width: 20%;
  text-align: center;
  padding: 17px 10px;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  color: #BAC3D8;
  background: #fff;
}
.table__frame{
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow: auto;
  overflow-x: hidden;
}
.table__frame-items{
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-right: -10px;
}
.table__frame::-webkit-scrollbar{
    background: #ffffff;
    width: 10px;
  }
.table__frame::-webkit-scrollbar-thumb{
  border-radius: 20px;
  background:#E5E5E5 ;
}
.table__frame-new{
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #384460;
  background: #EEF1F7;
  padding: 17px 10px;
}
</style>
