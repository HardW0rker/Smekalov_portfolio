<template>
  <div class="item">
    <div contenteditable="true" class="item__text" @keydown="save_data($event.target)" id="name">{{r_data.name}}</div>
    <div contenteditable="true" class="item__text" @keydown="save_data($event.target)" id="product_units">{{r_data.product_units}}</div>
    <div contenteditable="true" class="item__text" @keydown="save_data($event.target)" id="cost">{{r_data.cost}}</div>
    <div contenteditable="true" class="item__text" @keydown="save_data($event.target)" id="amount">{{r_data.amount}}</div>
    <div contenteditable="true" class="item__text" @keydown="save_data($event.target)" id="provider">{{r_data.provider}}</div>
<!--     <textarea class="item__text" v-model="r_data.name" rows='0' @keydown="resize($event.target)"></textarea>
    <textarea class="item__text" v-model="r_data.product_units" rows='0' @keydown="resize($event.target)"></textarea>
    <textarea class="item__text" v-model="r_data.cost"  rows='0' @keydown="resize($event.target)"></textarea>
    <textarea class="item__text" v-model="r_data.amount"  rows='0' @keydown="resize($event.target)"></textarea>
    <textarea class="item__text" v-model="r_data.provider"  rows='0' @keydown="resize($event.target)"></textarea> -->
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
      r_data:{}
    }
  },
  methods:{
    save_data(el){
      var text = el.innerHTML
      if(text[text.length-1] == '<'){
         console.log(text[text.length-1]);
      }
      if(el.id == 'name'){
        this.r_data.name = el.innerHTML;
      }
      if(el.id == 'product_units'){
        this.r_data.product_units = el.innerHTML;
      }
      if(el.id == 'cost'){
        this.r_data.cost = el.innerHTML;
      }
      if(el.id == 'amount'){
        this.r_data.amount = el.innerHTML;
      }
      if(el.id == 'provider'){
        this.r_data.provider = el.innerHTML;
      }
      console.log(this.r_data);
    }
    // resize(el) {
    //   setTimeout(function() {
    //     console.log(el.scrollHeight);
    //     el.style.cssText = 'height:auto; padding: 17px 10px;';
    //     el.style.cssText = 'height:' + (el.scrollHeight - 34)+ 'px';
    //     console.log(el.style.height);
    //   }, 0.5);
    // }
  },
  mounted(){
    this.r_data = this.data
  }
}

</script>
  
<style scoped>
  .item{
    transition: 1s;
    width: 100%;
    display: flex;
    gap: 5px;
  }
  .item__text{
    width: calc(20%);
    max-width: calc(20% - 28px);
    border: 2px solid #ffffff;
    text-align: center;
    padding: 12px 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 21px;
    resize: none;
    wrap: wrap;
    outline: none;
    color: #384460;
    background: #fff;
    transition: 0.5s;
  }
  .item__text:focus{
    border: 2px solid #7B57DF;
    background: #FAFAFA ;
  }
</style>
