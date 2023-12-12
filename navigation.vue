
<template>
    <div class="navigation">
        <Header />
        <div class="content">
            <button class="" @click="drowMap">drow</button>
            <div id="map" class="map"></div>
            <div class="navigationRotateMenu">
                <RotateMenu :changeZoom="changeZoom" :setLocation = "setLocation"/>
            </div>
            <div class="navigationmodal">
                <router-view />
            </div>
            <div class="navigationOptionMenu">
                <OptionMenu />
            </div>
            <div class="navigationNotification" v-if="operation.recording"
                :class="{ notificationHidden: notificationHidden }">
                <p class="navigationNotificationText" v-if="!notificationHidden">Идет запись траектории</p>
                <img src="./OptionMenu/icons/close_24px.svg" alt="" style="cursor: pointer;"
                    @click="notificationHidden = true" v-if="!notificationHidden">
            </div>
        </div>

    </div>
</template>
  
<script>
import axios from 'axios';
import Header from "./Header/Header.vue"
import RotateMenu from "./RotateMenu/RotateMenu.vue"
import OptionMenu from "./OptionMenu/OptionMenu.vue"

window.map = null;

async function initMap() {
    await ymaps3.ready;
    window.ymapsObjects = ymaps3;
    const { YMap, YMapDefaultSchemeLayer, YMapControls, YMapListener, YMapFeature, YMapDefaultFeaturesLayer } = ymaps3;
    map = new YMap(
        document.getElementById('map'),
        {
            location: {
                center: [37.64, 55.76],
                zoom: 17,
            }
        }
    );
    map.addChild(new YMapDefaultSchemeLayer());
}
// const { YMap, YMapDefaultSchemeLayer, YMapControls, YMapListener, YMapFeature, YMapDefaultFeaturesLayer } = initMap();

export function epsg3395ToLatLon(coordinates) {
    const result = [];
    for (let i = 0; i < coordinates.length; i++) {
        let pair = coordinates[i];
        let lon1 = (pair[0] / 6378137.0) * (180.0 / Math.PI);
        let lat1 =
            (2.0 * Math.atan(Math.exp(pair[1] / 6378137.0)) - Math.PI / 2.0) *
            (180.0 / Math.PI);
        result.push([lat1, lon1]);
    }
    return result;
}

async function getDataGons() {
    const answer = await axios.post(,
        {
            "fieldId": 1,
            "angle": 77.0,
            "offset": 10.0
        }
    )
        .then(response => (response.data))
        .catch((error) => {
            console.log(error);
        });
    console.log(answer);
    let temp = answer.map((item) => {
        return [item.x, item.y]
    })
    temp = epsg3395ToLatLon(temp);
    temp = temp.map((item) => {
        return [item[0], item[1]]
    })
    return temp
}

async function getDataBorders() {
    const answer = {
        "1": {
            "id": "af90aead-4056-4c45-9d8f-1402cd06ab9b",
            "x": 55.707331718887644,
            "y": 37.90912313933905
        },
        "2": {
            "id": "dfb4a49f-69fd-4110-82e3-a2d0b22799f8",
            "x": 55.65516619810005,
            "y": 37.801663116066976
        },
        "3": {
            "id": "75ffde64-8d34-4132-a34d-2836f3be4ca4",
            "x": 55.652454399630265,
            "y": 38.048855501868566
        }
    }
    let temp = Object.values(answer).map((item) => {
        return [item.y, item.x]
    })
    temp.push(temp[0]);
    return temp
}

async function drowMapFunction() {
    const { YMapDefaultSchemeLayer, YMapFeature, YMapDefaultFeaturesLayer } = window.ymapsObjects;

    const coordGoons = await getDataGons();
    const coordBorders = await getDataBorders();
    console.log(coordGoons);
    const Borders = {
        geometry: {
            type: 'LineString',
            coordinates: coordBorders,
        },
        style: {
            stroke: [
                {
                    color: '#5E6DF6',
                    // Stroke width.
                    width: 4,
                    // Stroke style.
                    // dash: [4, 8],
                },
            ],
        },
    };
    const Goons = {
        geometry: {
            type: 'LineString',
            coordinates: coordGoons,
        },
        style: {
            stroke: [
                {
                    color: '#5E6DF6',
                    // Stroke width.
                    width: 2,
                    // Stroke style.
                    // dash: [4, 20],
                },
            ],
        },
    };
    map.addChild(new YMapDefaultFeaturesLayer())
        .addChild(new YMapFeature(Borders))
        .addChild(new YMapFeature(Goons));

}


export default {
    name: 'App',
    components: {
        Header, RotateMenu, OptionMenu
    },
    data() {
        return {
            notificationHidden: false,
            zoom: 17,
            map: null,
        }
    },
    methods: {
        drowMap() {
            drowMapFunction();
        },
        setLocation(){
            map.setLocation({ center:[37.90912313933905, 55.707331718887644], zoom: this.zoom, duration: 200 });
        },
        async changeZoom(value) {
            this.zoom = this.zoom + value;
            if (this.zoom > 21) {
                this.zoom = this.zoom - 1;
            }
            if (this.zoom < 17) {
                this.zoom = this.zoom + 1;
            }
            map.setLocation({ center: map.center, zoom: this.zoom, duration: 200 });
        },
    },
    mounted() {
        initMap();
    },
    computed: {
        operation() {
            return this.$store.getters.getOperation;
        },
    }
}
</script>
  
<style scoped>
.navigation {
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.content {
    height: 100%;
    display: flex;
    position: relative;
    border-radius: 0px 0px 10px 10px;
    overflow: hidden;
}

.map {
    flex: 1 1;
}

.navigationRotateMenu {
    position: absolute;
    left: 32px;
    top: 32px;
}

.navigationOptionMenu {
    position: absolute;
    right: 0px;
    top: 0px;
    bottom: 0px;
}

.navigationmodal {
    position: absolute;
    right: 152px;
    top: 0px;
    bottom: 0px;
}

.navigationNotification {
    top: 16px;
    transition: 0.25s;
    left: calc(50% - 164px);
    padding: 14px 16px;
    width: 328px;
    position: absolute;
    border-radius: 4px;
    background: #2F312D;
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15);
    display: flex;
    gap: 16px;
    /* justify-content: space-between; */
}

.navigationNotificationText {
    color: #F1F1EB;
    overflow: hidden;
    height: 20px;
    text-overflow: ellipsis;
    flex: 1 1;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    /* 150% */
    letter-spacing: 0.5px;
}

.notificationHidden {
    width: 24px;
    padding: 8px;
    border-radius: 20px;
    /* justify-content: center; */
    left: calc(50% - 20px);
}

.recordIcon {
    cursor: pointer;
    width: 24px;
    height: 24px;
}
</style>
  