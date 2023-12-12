<template>
    <div class="rangeColorFrame">
        <div class="colorSpector" :style="{marginTop : type == 'single' ? '8px' : '8px',  marginBottom : type == 'single' ? '34px' : '0px' }">
            <div class="colorSpectorItem">
                <div class="spectorBlock"
                    :style=" { background: color ? (type == 'range' ? colorList[color][0] : colorList[color]) : transperent } "
                    style="border-radius: 6px 0px 0px 6px;"></div>
                    <p class="rangeColorFrameTextSmall" v-if=" type == 'range' ">{{ resaultMin }}-{{ (resaultMin +
                    step).toFixed(1) }} {{ unitType }}</p>
            </div>
            <div class="colorSpectorItem">
                <div class="spectorBlock"
                    :style=" { background: color ? (type == 'range' ? colorList[color][1] : colorList[color]) : transperent } ">
                </div>
                <p class="rangeColorFrameTextSmall" v-if=" type == 'range' ">{{ (resaultMin + step).toFixed(1) }}-{{
                    (resaultMin + step *
                    2).toFixed(1)
                    }} {{ unitType }}</p>
            </div>
            <div class="colorSpectorItem">
                <div class="spectorBlock"
                    :style=" { background: color ? (type == 'range' ? colorList[color][2] : colorList[color]) : transperent } ">
                </div>
                <p class="rangeColorFrameTextSmall" v-if=" type == 'range' ">{{ (resaultMin + step * 2).toFixed(1) }}-{{
                    (resaultMin + step *
                    3).toFixed(1)
                    }} {{ unitType }}</p>
            </div>
            <div class="colorSpectorItem">
                <div class="spectorBlock"
                    :style=" { background: color ? (type == 'range' ? colorList[color][3] : colorList[color]) : transperent } ">
                </div>
                <p class="rangeColorFrameTextSmall" v-if=" type == 'range' ">{{ (resaultMin + step * 3).toFixed(1) }}-{{
                    (resaultMin + step *
                    4).toFixed(1)
                    }} {{ unitType }}</p>
            </div>
            <div class="colorSpectorItem">
                <div class="spectorBlock"
                    :style=" { background: color ? (type == 'range' ? colorList[color][4] : colorList[color]) : transperent } "
                    style="border-radius: 0px 6px 6px 0px;"></div>
                    <p class="rangeColorFrameTextSmall" v-if=" type == 'range' ">{{ (resaultMin + step * 4).toFixed(1) }}-{{
                    resaultMax }} {{ unitType }}
                </p>
            </div>
        </div>
        <!-- <p class="rangeColorFrameTextBig">Max</p> -->
        <!-- {{ step }} -->
    </div>
</template>
<script>
export default {
    name: 'App',
    props: {
        color: {},
        min: {},
        max: {},
        defaultMin: {},
        unitType: {},
        defaultMax: {},
        type: {}
    },
    components: {
    },
    data() {
        return {
            colorList: {
                '#AF6DE3': [
                    '#CEB3E3',
                    '#BE8FE2',
                    '#AF6DE3',
                    '#9E48E1',
                    '#8D23E0'
                ],
                '#4F8AE2': [
                    '#82A8E0',
                    '#6798E1',
                    '#4F8AE2',
                    '#367CE5',
                    '#236FE0'
                ],
                '#6DD9E0': [
                    '#A9DDE0',
                    '#8CDADF',
                    '#6DDAE0',
                    '#4ED8E0',
                    '#23D5E0'
                ],
                '#55C96F': [
                    '#81C690',
                    '#6BC67F',
                    '#55C96F',
                    '#40C95E',
                    '#2EC950'
                ],
                '#FCF551': [
                    '#FFFBAA',
                    '#FFFA7A',
                    '#FCF551',
                    '#F4ED47',
                    '#F0E702'
                ],
                '#E2BB6D': [
                    '#E8D4AF',
                    '#E4C78E',
                    '#E2BB6D',
                    '#E2AE48',
                    '#E0A023'
                ],
                '#E17653': [
                    '#DF9881',
                    '#E1886B',
                    '#E17754',
                    '#E1643B',
                    '#E05123'
                ]
            }
        }
    },

    methods: {

    },
    mounted() {
    },
    computed: {
        resaultMin() {
            if (this.min == null || this.min == 0) {
                return this.defaultMin
            }
            return this.min
        },
        resaultMax() {
            if (this.max == null || this.max == 0) {
                return this.defaultMax
            }
            return this.max;
        },
        step() {
            return ((this.resaultMax - this.resaultMin) / 5);
        }
    }
}
</script>
  
<style scoped>
.rangeColorFrame {
    display: flex;
    gap: 4px;
    flex-direction: column;
}

.titleSelector {
    display: flex;
    justify-content: space-between;
    padding: 0px 30px;
}

.rangeColorFrameTextBig {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    line-height: 30px;
    /* 187.5% */
}

.rangeColorFrameTextSmall {
    color: #FFF;
    text-align: center;
    ;
    font-size: 12px;
    font-weight: 700;
    line-height: 30px;
    /* 214.286% */
}

.colorSpector {
    display: flex;
}

.colorSpectorItem {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.spectorBlock {
    width: 80px;
    height: 56px;
    transition: 0.5s;
}</style>