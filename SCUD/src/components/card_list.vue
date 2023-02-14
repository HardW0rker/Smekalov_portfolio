<template>
  <div class="card-list">
    <div 
    class="card-item" 
    v-for = "profile in profiles"
    :key = "profile"
    :class = "{'card-item-green':profile.on_work}">
      <div class="card-item__info">
        <div class="card-item__info-photo">
          <img
            v-if = "load_photo(profile.photo_path) && profile.photo_path != 'test'"
            :src= 'require(`@/assets/photo/${profile.photo_path}`)'
            class="card-item__info-photo-img">
          <img
            v-if = "profile.photo_path == 'test' || !load_photo(profile.photo_path)"
            src= '@/assets/photo/test.svg'
            class="card-item__info-photo-img">
        </div>
        <div class="card-item__info-FIO">
          <p class="card-item__info-FIO-text color-active">{{(profile.name).split(' ')[0]}}</p>
          <p class="card-item__info-FIO-text color-active">{{(profile.name).split(' ')[1]}}</p>
          <p class="card-item__info-FIO-text color-active">{{(profile.name).split(' ')[2]}}</p>
        </div>
      </div>
      <div class="card-item__time" v-if = "(profile.worktime_yesterday != '0') || (profile.worktime != '0')">
          <p class="card-item__time-title color-title">На работе сегодня: {{profile.worktime}}</p>
          <p class="card-item__time-subtitle color-subtitle">На работе вчера: {{profile.worktime_yesterday}}</p>
      </div>
      <div class="card-item__time" v-if = "(profile.worktime_yesterday == '0') && (profile.worktime == '0')">
          <p class="card-item__time-title color-title">Часов за неделю: {{(Math.trunc(profile.alltime/3600)).toString().padStart(2, '0')}}:{{(Math.trunc(profile.alltime/60 - Math.trunc(profile.alltime/3600)*60)).toString().padStart(2, '0')}}:{{(profile.alltime - Math.trunc(profile.alltime/60)*60).toString().padStart(2, '0')}}</p>
          <p class="card-item__time-subtitle color-subtitle">Последний раз был: {{profile.lastday}}</p>
      </div>
      <div 
      class = "card-item__top-status"
      :class = '{statusgreen : profile.on_work}'
      ></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  props:{
      profiles:{
    
      }
  },
  data(){
    return{

    }
  },
  methods:{
    load_photo(patch){
        try{
          if(require(`@/assets/photo/${patch}`)){
            return true;
          }
        }
        catch (error){
          return false;
        }
    },
  },

}
</script>

<style scoped>
.card-list{
  max-height: 80vh;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  gap:  20px 5px;
  flex-wrap: wrap;
}
.card-list::-webkit-scrollbar {
  width: 0;
}
.card-item{
  width: 280px;
  height: 177px;
  background-image: url(@/assets/card-back-red.svg);
}
.card-item-green{
   background-image: url(@/assets/card-back-green.svg);
}
.card-item__info{
  padding: 0px 10px;
  padding-top: 20px;
  display: flex; 
  gap: 10px;
}
.card-item__info-photo{
  padding: 1px;

}
.card-item__info-photo-img{
  height: 96px;
  width: 86px;
  border-radius: 7px;
  object-fit: cover;
}
.card-item__info-FIO{
  display: flex;  
  flex-direction: column;
  gap: 12px;
}
.card-item__info-FIO-text{
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
}
.card-item__top-status{
  position: relative;
  top: -124px;
  left: 232px;
  width: 14px;  
  height: 14px;
  background-image: url(@/assets/pointer_red.svg);
  background-size: cover;
}
.statusgreen{
  background-image: url(@/assets/pointer_green.svg);
}
.card-item__time{
  padding: 17px 10px;
}
.card-item__time-title{
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
}
.card-item__time-subtitle{
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
}

</style>