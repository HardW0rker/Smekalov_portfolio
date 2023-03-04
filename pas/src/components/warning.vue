<template>
  <div class="wraper_all">
    <div class="warning">
    <p class="warning__text">{{message.message}}</p>
    <div class="warning__button">
      <div class="warning__button-item item-active" @click = "click_warning(1)">Подтвердить</div>
      <div class="warning__button-item" @click = "click_warning(0)">Отменить</div>
    </div>
  </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  props:{
    message:{
    },
  },
  data(){
    return{
    }
  },
  methods:{
    click_warning(answer){
      event.stopPropagation()
      this.$emit('answer', answer, this.message.num);
    }
  },
  mounted(){
  }
}

</script>

<style scoped>
.wraper_all{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.warning{
  position: absolute;
  top: 30%;
  left: 50%;
  margin-left: -215px;
  width: 430px;
  padding: 30px 40px;
  border-radius: 10px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  -webkit-box-shadow: 4px 4px 23px 3px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 23px 3px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 23px 3px rgba(34, 60, 80, 0.2);
}
.warning__button{
  display: flex;
  gap: 20px;
}
.warning__text{
  width: 100%;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  color: #384460;
}
.warning__button-item{
  padding: 7px 0px;
  width: 130px;
  text-align: center;
  border-radius: 8px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  color: #384460;
  border: 1px solid #384460;
}
.item-active{
  border: none;
  border: 1px solid #7B57DF;
  background: #7B57DF;
  color: white;
}
</style>