<template>
   <div class="main_wraper" v-if="page==1">
      <div class="frame-road" v-if="data.document_id != -2">
        <Road :data = "data"/>
      </div>
      <div class="frame-road" v-if="data.document_id == -2">
        <Road_r :data = "data"/>
      </div>
      <div class="frame-info">
        <Info 
        :data = "data" 
        v-if="data.document_id != -2"
        @openPurchases="openPurchases"
        @openDocumets="openDocumets"/>
        <Info_r 
        :data = "data"
        v-if="data.document_id == -2"
        @openPurchases="openPurchases"
        @openDocumets="openDocumets"/>
      </div>
   </div>
   <div class="purchases" v-if="page==2">
     <Purchases 
     :data = "data"
     v-if="data.document_id != -2"
     @openMain="openMain"/>
     <PurchasesR
     v-if="data.document_id == -2"
     :data ="data.purchases"
     @openMain="openMain"/>
   </div>
   <div class="documets" v-if="page==3">
     <Documents 
     :data = "data"
     v-if="data.document_id != -2" 
     @openMain="openMain"/>
     <Documents_r
     v-if="data.document_id == -2" 
     :data = "data"
     @openMain="openMain"/>
   </div>
</template>

<script>

import Road from "@/components/road"
import Road_r from "@/components/road_r"
import Info from "@/components/info"
import Info_r from "@/components/info_r"
import Purchases from "@/components/purchases"
import PurchasesR from "@/components/purchasesR"
import Documents from "@/components/documents"
import Documents_r from "@/components/documents_r"

export default {
  name: 'App',
  components: {
    Road,Info,Info_r,Purchases,PurchasesR,Documents,Road_r,Documents_r
  },
  props:{
    data:{
    },
    page:{},
  },
  data(){
    return{
    }
  },
  methods:{
    openPurchases(){
       this.$emit('select_page',2);
    },
    openDocumets(){
       this.$emit('select_page',3);
    },
    openMain(){
       this.$emit('select_page',1);
    },

  },
  mounted(){
  }
}

</script>
  
<style scoped>
.main_wraper{
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.frame-road{
  flex: 0 0;
  transition: 1s;
}
.frame-info{
  flex: 1 1;
  min-height: 200px;
}
.purchases{
  height: 100%;
  min-height: 200px;
}
.documets{
  height: 100%;
  min-height: 200px;
}
</style>
