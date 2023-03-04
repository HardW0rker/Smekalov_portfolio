<template>
  <div class="header">
    <div class="header__text">
      <p class="header-title">Название документа: </p>
      <p class="header-subtitle">{{data.name}}</p>
    </div>
    <div class="header__text">
        <p class="header-title">Дата создания: </p>
        <p class="header-subtitle">{{data.date}}</p>
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

  }
}

</script>

<style scoped>
  .header{
    width: calc(100% - 80px);
    padding: 15px 40px;
    border-radius: 10px;
    justify-content: space-between;
    background: #fff;
    display: flex;
    gap: 20px;
    transition: 1s;
  }
  .header__text{
    display: flex;
    gap: 15px;
  }
  .header-title{
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    color: #757F97;
    transition: 1s;
  }
  .header-subtitle{
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #384460;
    transition: 1s;
  }
  @media (max-height: 1000px){
  .header-title{
    font-size: 18px;
    line-height: 20px;
  }
  .header-subtitle{
    font-size: 18px;
    line-height: 20px;
  }
}
</style>
