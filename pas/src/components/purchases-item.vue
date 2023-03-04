<template>
  <div class="item">
    <p class="item__text">{{data.name}}</p>
    <p class="item__text">{{data.product_units}}</p>
    <p class="item__text">{{data.cost}}</p>
    <p class="item__text">{{data.amount}}</p>
    <p class="item__text">{{data.provider}}</p>
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
  methods:{

  },
  mounted(){
  }
}

</script>
  
<style scoped>
  .item{
    width: 100%;
    transition: 1s;
    display: flex;
    gap: 5px;
  }
  .item__text{
    width: calc(20%);
    max-width: calc(20% - 20px);
    text-align: center;
    padding: 15px 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    color: #384460;
    background: #fff;
  }
</style>
