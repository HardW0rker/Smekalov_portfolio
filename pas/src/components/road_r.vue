<template>
  <Warning
  :message = "message_warm"
  v-if = "message_warm"
  @answer="answer"/>
  <div class="road">
   <div class="road__point">
    <div class="road__point-frame">
      <div class="road__point-item" :class = "{'point-item-active' :  data.points[0].status}" @click="click_point(0)"></div>
      <div class="road__point-name-frame">
       <p class="road__point-name-frame-text" :class = "{'point-text-active' : data.points[0].status}">{{data.points[0].text}}</p>
       <p class="road__point-name-frame-date" v-if=" data.points[0].status" >{{data.points[0].date}}</p>
      </div>
    </div>
    <div class="road__point-line" :class = "{'point-line-active' :  data.points[1].status}"></div>
    <div class="road__point-frame">
      <div class="road__point-item" :class = "{'point-item-active' :  data.points[1].status}" @click="click_point(1)"></div>
      <div class="road__point-name-frame">
       <p class="road__point-name-frame-text" :class = "{'point-text-active' : data.points[1].status}">{{data.points[1].text}}</p>
       <p class="road__point-name-frame-date" v-if=" data.points[1].status" >{{data.points[1].date}}</p>
      </div>
    </div>
    <div class="road__point-line" :class = "{'point-line-active' :  data.points[2].status}"></div>
    <div class="road__point-frame">
      <div class="road__point-item" :class = "{'point-item-active' :  data.points[2].status}" @click="click_point(2)"></div>
      <div class="road__point-name-frame">
       <p class="road__point-name-frame-text" :class = "{'point-text-active' : data.points[2].status}">{{data.points[2].text}}</p>
       <p class="road__point-name-frame-date" v-if=" data.points[2].status" >{{data.points[2].date}}</p>
      </div>
    </div>
    <div class="road__point-line" :class = "{'point-line-active' :  data.points[3].status}"></div>
    <div class="road__point-frame">
      <div class="road__point-item" :class = "{'point-item-active' :  data.points[3].status}" @click="click_point(3)"></div>
      <div class="road__point-name-frame">
       <p class="road__point-name-frame-text" :class = "{'point-text-active' : data.points[3].status}">{{data.points[3].text}}</p>
       <p class="road__point-name-frame-date" v-if=" data.points[3].status" >{{data.points[3].date}}</p>
      </div>
    </div>
   </div>
  </div>
</template>

<script>
import Warning from "@/components/warning"
export default {
  name: 'App',
  components: {
    Warning
  },
  props:{
    data:{
    },
  },
  data(){
    return{
      message_warm:'',
      new_data:{}
    }
  },
  methods:{
    click_point(num){
      if(num != 0 ){
        if(this.data.points[num-1].status && !this.data.points[num].status){
           this.message_warm = {'message':'Подтвердить выбор этапа?','num':num};
        }
      }
      else{
        this.message_warm = {'message':'Подтвердить выбор этапа?','num':num};
      }
    },
    async answer(answer,num){
      this.message_warm='';
      if(answer){
        var date = new Date();
        var month = parseInt(date.getMonth())+1
        this.new_data.points[num].status = true
        this.new_data.points[num].point_id
        this.new_data.points[num].date = `${date.getFullYear()}-${('00'+month).slice(-2)}-${date.getDate()}`
      }
    }

  },
  mounted(){
    this.new_data = this.data;
  }
}

</script>

<style scoped>
.road{
  width: calc(100% - 400px);
  border-radius: 10px;
  padding: 50px 200px;
  background: #fff;
  display: flex;
  transition: 1s;
}
@media (max-height: 1000px) or (max-width: 1900px) {
  .road{
    width: calc(100% - 200px);
    padding: 50px 100px;
  }
}
@media (max-width: 1500px) {
  .road{
    width: calc(100% - 40px);
    padding: 50px 20px;
  }
}
.road__point{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.road__point-frame{
  flex: 0 0 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
@media (max-width: 1500px) {
  .road__point-frame{
   flex: 0 0 100px;
  }
}
.road__point-item{
  background-image: url("@/assets/pointer.svg");
  width: 70px;
  height: 70px;
  background-size: 100%;
  transition: width 1s, height 1s;
  cursor: pointer;
}
@media (max-height: 1000px) or (max-width: 1900px) {
  .road__point-item{
    width: 60px;
    height: 60px;
  }
}
.point-item-active{
  cursor: default;
  background-image: url("@/assets/pointer-active.svg");
}
.road__point-line{
  background: #E4E4E4;
  flex: 1 1;
  height: calc(4%);
  border-radius: 50px;
  margin-top: 32px;
  transition:  margin-top 1s;
}
@media (max-height: 1000px) or (max-width: 1900px) {
  .road__point-line{
    margin-top: 28px;
  }
}
.point-line-active{
  background: #7B57DF;
}
.road__point-name-frame{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.road__point-name-frame-text{
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #D8D8D8;
}
.point-text-active{
  color: #384460;
}
.road__point-name-frame-date{
  font-style: normal;
  font-weight: 400;
  font-size:18px;
  color: #384460;
}
</style>