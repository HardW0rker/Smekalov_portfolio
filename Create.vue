<template>
    <div class="optionFrame" :class="{ widthFrameBig: field.recording }">
        <div class="optionHeader">
            <p>Добавление поля</p>
            <router-link :to="{ name: 'navigation' }" @click="this.$store.commit('changeNavigationMenuId', 0);">
                <span class="icon icon-close"></span>
            </router-link>
        </div>
        <div class="optionContent" v-if="!field.recording">
            <div class="itemFrameHorizontal" style="margin-top: -12px;">
                <router-link :to="{ name: 'navigationField' }" @click="this.$store.commit('changeCreateFieldStep', 0); this.$store.commit('changeField', {
                    name: null,
                    cadastralNumber: null,
                    district: null,
                    definition: false,
                    recording: false,
                    active: false,
                    equipment: false,
                    recordingPosition: 1
                });">
                    <img src="@/views/navigation/OptionMenu/icons/leftArrow.svg" alt="" class="">
                </router-link>
                <p>Назад</p>
            </div>
            <div class="itemFrame">
                <p class="">Наименование поля</p>
                <input class="counter" placeholder="Введите наименование поля" v-model="field.name" />
            </div>
            <div class="itemFrame">
                <p class="">Кадастровый номер</p>
                <input class="counter" placeholder="Введите кадастровый номер" v-model="field.cadastralNumber" />
            </div>
            <div class="itemFrame">
                <p class="">Район</p>
                <input class="counter" placeholder="Введите название района" v-model="field.district" />
            </div>
            <div class="itemFrame">
                <p class="">Площадь поля, га</p>
                <Slider :fersttext="'По кадастру'" :secondtext="'Определение'" :value="field.definition"
                    :changeValue="(value) => field.definition = value" style="marginTop:8px" />
            </div>
            <div class="itemFrame" v-if="!field.definition">
                <div class="primeryBtn br6" style="padding: 8px 0px; marginTop:8px">
                    <p>Добавить поле</p>
                </div>
            </div>
            <div class="itemFrame" v-if="field.definition">
                <div class="primeryBtn br6" style="padding: 8px 0px; marginTop:8px" @click="enter">
                    <p>Определить границы поля</p>
                </div>
            </div>
        </div>
        <div class="optionContent" v-if="field.recording">
            <div class="itemFrameHorizontal" style="margin-top: -12px;">
                <router-link :to="{ name: 'navigationField' }" @click="field.recording = false">
                    <img src="@/views/navigation/OptionMenu/icons/leftArrow.svg" alt="" class="">
                </router-link>
                <p>Назад</p>
            </div>
            <div class="itemFrame">
                <p class="">Спецтехника</p>
                <div class="disableText" v-if="!errorTechnique && !EnterTechnique">Не указано</div>
                <p class="" v-if="EnterTechnique" style="margin-left: 12px;">{{ EnterTechnique.name }}</p>
                <Notification :text="'Задайте спецтехнику'" v-if="errorTechnique" />
            </div>
            <div class="itemFrame" style="flex-direction: row; justify-content: space-between; align-items: center;">
                <p class="">Учитывать оборудование</p>
                <RadioBtn :value="field.equipment" :changeValue="(value) => field.equipment = value" />
            </div>
            <div class="itemFrame" v-if="field.equipment">
                <p class="">Оборудование</p>
                <div class="disableText" v-if="!errorEquipment && !EnterEquipment">Не указано</div>
                <p class="" v-if="EnterEquipment" style="margin-left: 12px;">{{ EnterEquipment.name }}</p>
                <Notification :text="'Задайте оборудование'" v-if="errorEquipment" />
            </div>
            <div class="itemFrame">
                <p class="">Варианты учета границы поля</p>
                <SliderImg :changeValue="(value) => field.recordingPosition = value" :value="field.recordingPosition" />
            </div>
            <div class="itemFrame">
                <div class="primeryBtn br6" style="padding: 8px 0px; marginTop:8px; gap:4px" @click="startRecording()">
                    <img src="@/views/navigation/OptionMenu/icons/radio_button_checked.svg" alt="">
                    <p>Начать определение границы поля</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {startDraw} from "@/api/fuildApi.js";
import Notification from '@/components/errorNotification/errorNotification.vue'
import Slider from '@/components/Slider/slider.vue';
import SliderImg from '@/components/Slider/sliderImg.vue';
import RadioBtn from '@/components/radioBtn/radioBtn.vue';
export default {
    name: 'App',
    props: {
    },
    components: {
        Slider, SliderImg, RadioBtn, Notification
    },
    data() {
        return {
            // field: {
            //     name: null,
            //     cadastralNumber: null,
            //     district: null,
            //     definition: false,
            //     recording: false,
            //     active: false,
            // },
            borders: 1,
            errorEquipment: false,
            errorTechnique: false,
        }
    },

    methods: {
        async startRecording() {
            if (!this.EnterEquipment) {
                this.errorEquipment = true;
            }
            if (!this.EnterTechnique) {
                this.errorTechnique = true;
            }
            if(!this.errorTechnique && !this.errorEquipment){
                let answer = await startDraw(this.EnterTechnique.id, this.EnterEquipment.id);
                console.log(answer);
            }
        },
        enter() {
            if (this.field.name != null, this.field.cadastralNumber != null, this.field.district != null) {
                this.$store.commit('changeField', this.field);
                if (this.field.definition) {
                    this.field.recording = true;
                }
            }
        }
    },
    mounted() {
        // this.field = this.$store.getters.getField;
    },
    computed: {
        EnterEquipment() {
            return this.$store.getters.getEnterEquipment;
        },
        EnterTechnique() {
            return this.$store.getters.getEnterTechnique;
        },
        field() {
            return this.$store.getters.getField;
        }

    }
}
</script>
  
<style scoped>
@import "@/icons/style.css";
@import "../optionMenuStyle.scss";

.widthFrame {
    width: 450px;
}

.widthFrameBig {
    width: 500px;
}
</style>