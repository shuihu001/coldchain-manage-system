<!--<template>-->
<!--  <div class="video">-->
<!--    <video-player-->
<!--        class="video-player vjs-custom-skin"-->
<!--        ref="videoPlayer"-->
<!--        :playsline="false"-->
<!--        :options="playerOptions">-->
<!--    </video-player>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  export default {-->
<!--    name: "goodVideo",-->
<!--    props:{-->
<!--      videoUrl:"",-->
<!--    },-->
<!--    data () {-->
<!--      return {-->
<!--        playerOptions: {-->
<!--          playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度-->
<!--          autoplay: false, // 如果true,浏览器准备好时开始回放。-->
<!--          muted: false, // 默认情况下将会消除任何音频。-->
<!--          loop: false, // 导致视频一结束就重新开始。-->
<!--          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）-->
<!--          language: 'zh-CN',-->
<!--          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）-->
<!--          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。-->
<!--          sources: [{-->
<!--            type: 'application/x-mpegURL',-->
<!--            // type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目-->
<!--            // src: '../../../../static/video1.mp4' // url地址-->
<!--            // src: "http://vjs.zencdn.net/v/oceans.mp4" // url地址-->
<!--            src: "http://play.skwlljk.cn/vehicle/firstvideo.m3u8" // url地址-->
<!--            // src: 'https://play.skwlljk.cn/vehicle/firstvideo.m3u8' // url地址-->
<!--          }],-->
<!--          // poster: '../../../../static/full_res.jpg', // 你的封面地址-->
<!--          width: document.documentElement.clientWidth, // 播放器宽度-->
<!--          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。-->
<!--          controlBar: {-->
<!--            timeDivider: true,-->
<!--            durationDisplay: true,-->
<!--            remainingTimeDisplay: false,-->
<!--            fullscreenToggle: true // 全屏按钮-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->
<!--  .video{-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--  }-->
<!--  .video-js .vjs-icon-placeholder {-->
<!--    width: 80%;-->
<!--    height: 100%;-->
<!--    display: block;-->
<!--  }-->
<!--  /* .video-player {-->
<!--    width: 50%;-->
<!--  } */-->
<!--</style>-->

<template>
  <div class="liveView">
    <video ref="goodVideo" controls muted width="100%" height="100%"></video>
    <!-- <video-player class="vjs-custom-skin"
                  ref="videoPlayer"
                  :options="playerOptions"
                  @ready="onPlayerReadied"
                  :playsinline="playsinline">
    </video-player> -->
  </div>
</template>

<script>
  import flv from 'flv.js'
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'

  import 'videojs-contrib-hls'

  export default {
    name: 'goodVideo',
    props:{
      videoUrl:''
    },
    components: {
      videoPlayer
    },
    data () {
      return {
        // videoSrc:'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8',
        initialized: false,
        currentTech: '',
        streams: {
          rtmp: '',
          hls: ''
        },
        playerOptions: {
          overNative: true,
          autoplay: false,
          controls: true,
          techOrder: ['html5'],
          sourceOrder: true,
          flash: {
            hls: { withCredentials: false }
          },
          html5: { hls: { withCredentials: false } },
          sources: [
            {
              withCredentials: false,
              // type: 'application/x-mpegURL',
              type: 'video/mp4',
              // src: 'https://krtxplay1.setrtmp.com/live/SSAA-099937-ABCFB.m3u8'
              // src: 'http://play.skwlljk.cn/vehicle/firstvideo.m3u8?auth_key=1621915224-0-0-14128134e55b3efa3b11a97e30470fe0'
              // src: 'http://vjs.zencdn.net/v/oceans.mp4'
              src: 'http://coldchain-vehicle.oss-cn-beijing.aliyuncs.com/record/vehicle/secondVideo/2021-11-09-14-48-37_2021-11-09-14-49-52.mp4'
              // src: 'http://play.skwlljk.cn/vehicle/firstvideo.m3u8'
              // src: 'http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8'
              // src: this.videoUrl
              // src: 'https://play.skwlljk.cn/vehicle/firstvideo.m3u8'
            }
          ]
        }
      }
    },
    watch: {
      '$route' () {
        console.log(this.videoUrl);
        this.$nextTick(() => {
          this.createVideo()
        })
      }
    },
    created() {
      console.log(this.videoUrl);
    },
    mounted () {
      console.log(this.videoUrl);
      this.createVideo()
    },
    computed: {
      player () {
        return this.$refs.videoPlayer.player
      },
      currentStream () {
        return this.currentTech === 'Flash' ? 'RTMP' : 'HLS'
      },
      playsinline () {
        let ua = navigator.userAgent.toLocaleLowerCase()
        // x5内核
        if (ua.match(/tencenttraveler/) != null || ua.match(/qqbrowse/) != null) {
          return false
        } else {
          // ios端
          return true
        }
      },
      // videoSrc () {
      //   return this.order
      // }
    },
    methods: {
      onPlayerReadied () {
        if (!this.initialized) {
          this.initialized = true
          this.currentTech = this.player.techName_
        }
      },
      createVideo () {
        if (flv.isSupported()) {
          const videoElement = this.$refs.goodVideo
          const flvPlayer = flv.createPlayer({
            type: 'flv',
            url: this.videoUrl
          })
          flvPlayer.attachMediaElement(videoElement)
          flvPlayer.load()
          flvPlayer.play()
        }
      },
    }
  }
</script>

<style scoped>
  .liveView {
    height: 100%;
  }
  .vjs-custom-skin{
    height: 100%;
  }
</style>
<style>
  .video-js{
    height: 100%;
  }
</style>