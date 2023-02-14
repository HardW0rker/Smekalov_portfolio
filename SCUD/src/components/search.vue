<template>
 <div class="search">
    <div class="infoprofile-farme" v-if = "info_v">
      <infoprofile
      :profile = "profile"/>
    </div>
   <div class="search-list">
    <div class="search-header">
     <div class="search-header__status">
       <p class="search-header__text" @click = "sortfunction">Статус</p>
       <div 
       class="search-header__status-pointer"
       :class = '{pointerrotate : !sort}'
       ></div>
     </div>
     <div class="search-header__input">
       <input placeholder="Фио" type="text" id = "table_fio" v-model="search_fio" class="search-header__input-text">
     </div>
     <div class="search-header__input">
       <input placeholder="Должность" type="text" id = "table_post"  v-model="search_post" class="search-header__input-text">
     </div>
     <div class="search-header__time">
       <p class="search-header__text">Часов за последнюю неделю</p>
     </div>
   </div>
     <div class="search-item" v-for = "profile in filteredList" :key = 'profile'   @click = "click_profile(profile)">
       <div class="search-item__status">
         <div 
         class="search-item__status-img"
         :class = '{statusgreen : profile.on_work}'
         ></div>
       </div>
       <div class="search-item__input">  
          <p class="search-item__text">{{profile.name}}</p>
       </div>
       <div class="search-item__input">  
          <p class="search-item__text">{{profile.custom_hashtag}}</p>
       </div>
       <div class="search-item-time">  
          <p class="search-item__text">{{(Math.trunc(profile.alltime/3600)).toString().padStart(2, '0')}}:{{(Math.trunc(profile.alltime/60 - Math.trunc(profile.alltime/3600)*60)).toString().padStart(2, '0')}}:{{(profile.alltime - Math.trunc(profile.alltime/60)*60).toString().padStart(2, '0')}}</p>
       </div>
     </div>
   </div>
 </div>
</template>

<script>

import infoprofile from '@/components/info-profile.vue'

export default {
  name: 'App',
  components: {
    infoprofile
  },
  props:{
      profiles:{
    
      }
  },
  data(){
    return{
      sort:true,
      info_v:false,
      search_fio:'',
      search_post:'',
      profile:{

      },
    }
  },
  methods:{
    click_profile(data){
      this.profile = data;
      this.info_v = true;
    },
    sortfunction(){
        if(this.sort){
          this.sort = false;
          this.$emit('changeSort',2);
        }
        else{
          this.sort = true;
          this.$emit('changeSort',1);
        }
        this.$emit('sort');
    },
    searchFIO(){
      console.log('test');
      document.querySelector('#table_post').value = '';
       let val = document.querySelector('#table_fio').value.trim();
       let elasticItems = document.querySelectorAll('.search-item');
       if (val != '') {
           elasticItems.forEach(function (elem) {
               if (elem.innerText.search((RegExp(val,"gi"))) == -1) {
                   elem.classList.add('hide');
               }
               else {
                   elem.classList.remove('hide');
               }
           });
       }
       else {
             elasticItems.forEach(function (elem) {
              
                   elem.classList.remove('hide');
               
             });
       }
    },
    searchPost(){
    document.querySelector('#table_fio').value = '';
      let val = document.querySelector('#table_post').value.trim();
      let elasticItems = document.querySelectorAll('.search-item');
      if (val != '') {
          elasticItems.forEach(function (elem) {
              if (elem.innerText.search((RegExp(val,"gi"))) == -1) {
                  elem.classList.add('hide');
              }
              else {
                  elem.classList.remove('hide');
              }
          });
      }
      else {
            elasticItems.forEach(function (elem) {
             
                  elem.classList.remove('hide');
              
            });
      }
    }
  },
  mounted(){
    this.$emit('changeSort',1);
    this.$emit('sort');
  },
  computed: {
    filteredList() {
      return this.profiles.filter(post => {
        let temp = post.name.toLowerCase().includes(this.search_fio.toLowerCase()) && post.custom_hashtag.toLowerCase().includes(this.search_post.toLowerCase())
        return temp
      })

    }
  }

}


</script>

<style scoped>
.search{
  padding: 25px;  
  background: #fff;
  border-radius: 20px;
  opacity: 0.7;

}
.infoprofile-farme{
  position: relative;
  top: 230px;
  width: 80%;
  margin: 0 auto;
  max-width: 1200px;
  height: 600px;
  background: white;
  margin-bottom: -600px;

}
.search-header{
  display: flex;
  background: #fff;
  position: sticky;
  top: 0px;
}
.search-header__text{
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #203270;
}
.search-header__status{
  flex: 1 1 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  padding: 0px 20px;
  padding-bottom: 25px; 
  border-right:  1px solid #203270;
}
.search-header__status-pointer{
  width: 18px;
  height:8px;
  background-image: url('@/assets/arrow_blue.png');
  background-size: cover;
}
.pointerrotate{
  transform: rotate(180deg);
}
.search-header__input{
  padding-bottom: 25px; 
  border-right:  1px solid #203270;
  display: flex;
  justify-content: center;
  flex: 1 1 35%;
}
.search-header__input-text{
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  padding: 5px 10px;
  width: 70%;
  color: #203270;
  background: transparent;
  border: none;
  border-bottom: 1px solid #203270;
}
.search-header__input-text::placeholder{
  color: #203270;
}
.search-header__time{
  flex: 1 1 20%;
  padding-bottom: 25px;
  padding: 0px 20px; 
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-list{
  max-height:  80vh;

  overflow: auto;
}
.search-list::-webkit-scrollbar {
  background:transparent;
  top: 100px;
  width: 18px;
}
.search-list::-webkit-scrollbar-thumb {
  background-image: url('@/assets/scroll.svg');
  border-radius: 20px;
  width: 18px;
}
.search-item{
  display: flex;  
  border-bottom:  1px solid #203270;
}
.search-item__status{
  padding: 25px 20px;  
  flex: 1 1 10%;
  display: flex; 
  justify-content: center;
  align-items: center;
  min-width: 84px;
  border-right:  1px solid #203270;
}
.search-item__input{
  padding: 25px 0px;  
  flex: 1 1 35%;
  display: flex;  
  justify-content:  center;
  border-right:  1px solid #203270;
}
.search-item-time{

  padding: 25px 20px; 
  flex: 1 1 20%;
  display: flex; 
  justify-content: center;
  text-align: center;
}
.search-item__status-img{
  width: 14px;  
  height: 14px;
  background-image: url(@/assets/pointer_red.svg);
  background-size: cover;
}
.statusgreen{
  background-image: url(@/assets/pointer_green.svg);
}
.search-item__text{
  width: 80%;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  color: #203270;
}
.hide{
  display: none;
  background: red;
}
</style>