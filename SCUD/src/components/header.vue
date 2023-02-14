<template>
  <div class="header back-active">
    <div class="header__menu">
      <div class="header__menu-button color-active"  @click = "click_page(1)">Список сотрудников</div>
      <div class="header__menu-button color-active" @click = "click_page(2)">Поиск сотрудников</div>
    </div>
    <a class="header__menu-export color-active" href ="http://10.11.12.77:5000/get-xls/Daywork">Экспорт Excel</a>
  </div>
</template>

<script>

export default {
  name: 'App',
  methods:{
    click_page(number){
      this.$emit('open_page',number);
    }
  }
}
</script>

<style scoped>
.header{
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header__menu{
  display: flex;
  gap: 70px;
}
.header__menu-button{
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
}
.header__menu-export{
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  padding: 5px 15px;
  border: 2px solid white;
}
</style>