<template>
  <div class="wraper">
    <div class="continer">
      <header_item
      @open_page = "open_page"
      />
      <filter_item
      v-if = "page == 1"
      @sort = "sortFunc"
      @changeSort = "change_sort_active" 
      />
      <card_list
      v-if = "page == 1 && render"
      :profiles = "sort_profiles" 
      />
      <search
      v-if = "page == 2 && render"
      :profiles = "sort_profiles"
      @sort = "sortFunc"
      @changeSort = "change_sort_active" 
      />
    </div>
  </div>
</template>

<script>
import card_list from '@/components/card_list.vue'
import filter_item from '@/components/filter.vue'
import search from '@/components/search.vue'
import header_item from '@/components/header.vue'
import axios from 'axios';
import patch from '@/config.js';


export default {
  name: 'App',
  components: {
    card_list,filter_item,search,header_item
  },
  data(){
    return{
      profiles:{},
      day:{

      },
      week:{

      },
      render:0,
      page:1,
      sort_profiles:{},
      sort_active:1
    }
  },

  methods:{
    change_sort_active(sort_number){
      console.log(sort_number);
      this.sort_active = sort_number;
      this.sort_profiles = this.sortFunc();
    },
    async created() {
      this.profiles = await this.getProfiles();
      this.day = await this.getDay_time();
      this.week = await this.getWeek_time();
      this.sort_profiles = this.sortFunc();
      this.addtime();
      this.render = 1;
      return 1;
    },
    dtime_nums(e) {
      var n = new Date;
      n.setDate(n.getDate() + e);
      return n.toLocaleDateString();
    },
    open_page(number){
      this.page = number;
    },
    async getProfiles(){
      return (await axios.get(patch.patch_profiles())).data.profiles;
    },
    async getDay_time(){
      return (await axios.get(patch.patch_day())).data.daywork_rec;
    },
    async getWeek_time(){
      return (await axios.get(patch.patch_week())).data.daywork_rec;
    },
    sortFunc: function (){
      if(this.sort_active == 1){
        let temp =  this.profiles.slice().sort(function(a, b){
        return (a.on_work > b.on_work) ? -1 : 1;
        });
        temp = temp.slice().sort(function(a, b){
          return ((a.on_work ==  b.on_work) && (a.name <  b.name)) ? -1 : 1;
        });
        return temp
      }
      else
      if(this.sort_active == 2){
        let temp =  this.profiles.slice().sort(function(a, b){
        return (a.on_work > b.on_work) ? 1 : -1;
        });
        temp = temp.slice().sort(function(a, b){
          return ((a.on_work ==  b.on_work) && (a.name <  b.name)) ? -1 : 1;
        });
        return temp
      }
      else
      if(this.sort_active == 3){
        let temp = this.profiles =  this.profiles.slice().sort(function(a, b){
            return (a.name > b.name) ? 1 : -1;
        });
        return temp
      }
    },
    addtime(){
       this.profiles.map(profile => {
          var yesterday = `${this.dtime_nums(-1).split('.')[2]} ${this.dtime_nums(-1).split('.')[1]} ${this.dtime_nums(-1).split('.')[0]}`;
          profile.alltime = 0;
          profile.worktime = 0;
          profile.worktime_yesterday = 0;
          profile.lastday = 'Больше недели назад';
          var id = profile.id;
           this.day.map(day => {
            var day_id = day.user_id;
            if(id == day_id){
              profile.worktime = day.total_time;
            }
           });
           this.week.map(week => {
            var week_id = week.user_id;
            if(id == week_id){
              if(week.record_day == yesterday){
                profile.worktime_yesterday = week.total_time
              }
              profile.lastday = week.record_day.split(' ')[2] + '.' + week.record_day.split(' ')[1]  + '.' + week.record_day.split(' ')[0];
              profile.alltime = profile.alltime + parseInt(week.total_time.split(':')[0] * 3600) +  parseInt(week.total_time.split(':')[1]) * 60 +  parseInt(week.total_time.split(':')[2]);
            }
           });
       });
      
    }
  },
  mounted(){
      this.created();
      setInterval(
        ()=>{
            this.created();
        }
      , 10000);
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Text:wght@900&family=Roboto:wght@300;400;500;700&display=swap');
*{
  font-family: 'Roboto';
  padding: 0;
  margin: 0;
  text-decoration: none;
}
.back-active{
  background: #177CA1;
}
.back-filter{
  background: #FFFFFF;
}
.color-active{
  color: #FFFFFF;
}
.color-title{
  color: #136988;
}
.color-subtitle{
  color: #8F8F8F;
}
.wraper{
  background-image: url('@/assets/background.svg');
  background-size: cover;
  min-height: 100vh;
}
.continer{
  padding: 25px;
  margin: 0 auto;
  max-width: 1800px;
  min-width: 850px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
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
  cursor: pointer;
}
.header__menu-export{
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 29px;
  padding: 5px 15px;
  border: 2px solid white;
  cursor: pointer;
}
</style>
