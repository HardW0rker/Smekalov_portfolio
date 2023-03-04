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
            <TableNewItem
            v-for = "item in new_data" 
            v-bind:key = "item"
            :data="item"/>
          </div>
          <div class="table__frame-new" @click="addrow">Добавить строку +</div>
        </div>
      </div>
   </div>
</template>

<script>
import TableNewItem from "@/components/purchases-new-item"

export default {
  name: 'App',
  components: {
    TableNewItem
  },
  props:{
    data:{
    },
  },
  data(){
    return{
      new_data:[
          // {'name':'','product_units':'','cost':'','amount':'','provider':''},
        ],
      message_warm:''
    }
  },
  methods:{
    addrow(){
      this.new_data[this.new_data.length] = {'name':'','product_units':'','cost':'','amount':'','provider':''}
    },
    closePurchases(){
      this.$emit('openMain');
    },
  
  },
  mounted(){
    this.new_data = this.data
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
  transition: width 1s;
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
  border: 2px solid #ffffff;
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
  overflow-y: auto;
  overflow-x: hidden;
}
.table__frame-items{
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-right: -10px;
}
.table__frame::-webkit-scrollbar{
    color: transparent;
     width: 10px;
  }
.table__frame::-webkit-scrollbar-thumb{
  border-radius: 20px;
  background:#E5E5E5 ;
}
.table__frame-new{
  cursor: pointer;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #384460;
  background: #EEF1F7;
  padding: 17px 10px;
  border-radius: 0px 0px 20px 20px;
}
.table__frame-save{
  display: flex;
  justify-content: flex-end;
}
.table__frame-save-btn{
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  background: #5DC983;
  padding: 10px 20px;
  border-radius: 12px;
  width: 213px;
}
</style>
