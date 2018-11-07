<template>
  <Card>

    <p>采用 video.js + videojs-contrib-hls</p>

    <p>按需加载 以上两个 npm包 </p>

    <p><a href="https://www.awaimai.com/2053.html">video.js使用技巧</a> </p>

    <Divider/>

    <video id="example-video" class="video-js" controls preload="auto">
      <!-- <source src="http://193.112.101.157:8080/hls/test.m3u8" type="application/x-mpegURL" /> -->
      <source :src="videoUrl"
              type="application/x-mpegURL">
    </video>
  </Card>

</template>

<script>
import config from '@/config'
import 'video.js/dist/video-js.css'
import videojs from 'video.js/dist/video.min'
import 'videojs-contrib-hls'

export default {
  name: 'video',
  data () {
    return {
      videoUrl: `${config.videoUrl}/mag/hls/7642fd59ab2345b5b414b3045409ba38/0/live.m3u8`
    }
  },
  mounted () {
    // console.log(videojs)
    let player = videojs('example-video')
    player.play()
  }
}
</script>

<style scoped>

</style>
