<template>
  <div class="filter">
    <div class="filter__select back-filter" @click = "openFilterList">
     <p class="filter-text">{{name_filter[1]}}</p>
     <div class="filter-pointer"></div>
    </div>
    <div class=" filter__list back-filter" v-if="filter_list_v">
    <div class="filter__list-select" @click = "selectFilterList(1)">
      <p class="filter-text">{{name_filter[1]}}</p>
      <div class="filter-pointer pointer-rotate"></div>
    </div>
     <p class="filter-text" @click = "selectFilterList(2)">{{name_filter[2]}}</p>
     <p class="filter-text" @click = "selectFilterList(3)">{{name_filter[3]}}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      name_filter:{
        1:'Сначала активные',
        2:'Сначала не ативные',
        3:'По алфавиту'
      },
      filter_list_v: false
    }
  },
  methods:{
    openFilterList(){
      this.filter_list_v = true
    },
    selectFilterList(number){
      this.filter_list_v = false;
      var temp = this.name_filter[number];
      this.name_filter[number] = this.name_filter[1];
      this.name_filter[1] = temp;
      if(this.name_filter[1] == "Сначала активные")
        this.$emit('changeSort',1);
      if(this.name_filter[1] == "Сначала не ативные")
        this.$emit('changeSort',2);
      if(this.name_filter[1] == "По алфавиту")
        this.$emit('changeSort',3);
      this.$emit('sort');
    }
  }
}
</script>

<style scoped>

.filter{
  display: flex;
  justify-content: flex-end;
}
.filter__select{
  cursor: pointer;
  display:flex;
  width: 245px;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  border-radius: 8px;
}
.filter-pointer{
  cursor: pointer;
  width: 18px;
  height:8px;
  background-image: url('@/assets/arrow_new.svg');
  background-size: cover;
}
.pointer-rotate{
  transform: rotate(180deg);
}
.filter-text{
  color: #177CA1;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
}
.filter__list{
   cursor: pointer;
  position: absolute;
  padding: 7px 10px;
  border-radius: 8px;
  width: 245px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 2;
}
.filter__list-select{
  display: flex;
  justify-content: space-between;
  align-items: center;
}


</style>