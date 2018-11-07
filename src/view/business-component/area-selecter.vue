<template>
  <Card>

    <p>采用 iview-area</p>
    <p><a href="https://iview.github.io/iview-area/" target="_blank">官方文档</a></p>
    <Divider />


    <al-selector auto class="area-selector" data-type="name" v-model="pcd" level="2" style="width:450px"
                 ref="alCascader"/>
    <Divider />

    <al-cascader class="area-selector" data-type="name" v-model="pcd" level="2" style="width:200px"></al-cascader>
  </Card>
</template>

<script>
  export default {
    name: "area-selecter",
    data () {
      return {
        pcd:[]
      }
    }
  }
</script>

<style scoped>

</style>
