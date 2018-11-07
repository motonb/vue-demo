<template>
  <Card>
    <p>采用 vue-baidu-map</p>
    <p><a href="https://dafrok.github.io/vue-baidu-map/#/zh/index" target="_blank">官方文档</a></p>
    <p>右下角定位功能。全图获取地图中心经纬度。</p>
    <Divider />

    <b-map class="map" :center="center" :zoom="zoom" scroll-wheel-zoom="true"
           @moving="syncCenterAndZoom"
           @moveend="syncCenterAndZoom"
           @zoomend="syncCenterAndZoom"
           ak="zxaE2esdhpAdLNU8KLyTqitkPutG75bY">
      <b-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true" ></b-geolocation>
    </b-map>
    <input v-model.number="center.lng">
    <input v-model.number="center.lat">
    <input v-model.number="zoom">
  </Card>
</template>

<script>
  import BMap from 'vue-baidu-map/components/map/Map.vue'
  import BGeolocation from 'vue-baidu-map/components/controls/Geolocation.vue'
  import event from 'vue-baidu-map/components/base/events.js'//光引入是不会生效的，需要修改文件内的对应组件名称

  export default {
    name: "baidu-map",
    data () {
      return {
        center: {
          lng: 116.404,
          lat: 39.915
        },
        zoom: 15
      }
    },
    components: {
      BMap,
      BGeolocation,
      event
    },
    methods: {
      syncCenterAndZoom (e) {
        const {lng, lat} = e.target.getCenter()
        this.center.lng = lng
        this.center.lat = lat
        this.zoom = e.target.getZoom()
      }
    }
  }
</script>

<style scoped>
  .map {
    width: 100%;
    height: 600px;
  }
</style>
