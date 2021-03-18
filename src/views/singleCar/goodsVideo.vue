<template>
  <div id="video">
<!--  <video-player  class="video-player vjs-custom-skin"-->
<!--                 ref="videoPlayer"-->
<!--                 :playsinline="true"-->
<!--                 :options="playerOptions"-->
<!--  ></video-player>-->
  <embed type="application/x-vlc-plugin" pluginspage="http://www.videolan.org"
         width="400" height="200" id="vlc" version="VideoLAN.VLCPlugin.1"
         autoplay="yes" loop="no" target="rtmp://192.168.1.104:1935/flash/22:YWRtaW46YWRtaW4=" >

<!--  <object id="HYPlayOCX" name="object" classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921"-->
<!--          codebase="D:\VLC\axvlc.cab" style="width: 100%; height: 100%" events="True">-->
<!--&lt;!&ndash;          codebase="http://downloads.videolan.org/pub/videolan/vlc/latest/win64/axvlc.cab" style="width: 100%; height: 100%" events="True">&ndash;&gt;-->
<!--    <param name="src" value="rtmp://192.168.1.102:1935/flash/22:YWRtaW46YWRtaW4=" />-->
<!--    <param name="ShowDisplay" value="True" />-->
<!--    <param name="AutoLoop" value="False" />-->
<!--    <param name="AutoPlay" value="True" />-->
<!--    <param name="ExtentWidth" value="21167" />-->
<!--    <param name="ExtentHeight" value="13229" />-->
<!--    <embed pluginspage="http://www.videolan.org" toolbar="true" loop="true" name="vlc"-->
<!--           text="Waiting for video" type="application/x-vlc-plugin" version="VideoLAN.VLCPlugin.3"-->
<!--    width="100%" height="100%"/>-->
<!--  </object>-->

<!--    <object type='application/x-vlc-plugin' id='vlc' events='True'-->
<!--            classid='clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921' codebase="D:\VLC\axvlc.cab" width="400" height="200">-->
<!--      <param name='mrl' value='rtmp://192.168.1.104:1935/flash/22:YWRtaW46YWRtaW4=' />-->
<!--      <param name='volume' value='50' />-->
<!--      <param name='autoplay' value='true' />-->
<!--      <param name='loop' value='false' />-->
<!--      <param name='fullscreen' value='false' />-->
<!--      <embed type="application/x-vlc-plugin" pluginspage="http://www.videola.org"-->
<!--             width="400" height="200" version="VideoLAN.VLCPlugin.1"-->
<!--             autoplay="yes" loop="no">-->
<!--    </object>-->
  </div>
</template>
<script>
  export default {
    name: 'goodsVideo',
    data() {
      return {
        // 视频播放
        // playerOptions: {
        //   playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        //   autoplay: false, //如果true,浏览器准备好时开始回放。
        //   muted: false, // 默认情况下将会消除任何音频。
        //   loop: false, // 导致视频一结束就重新开始。
        //   preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        //   language: 'zh-CN',
        //   aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        //   techOrder: ['flash', 'html5'],      // 兼容顺序
        //   flash: {
        //     hls: {withCredentials: false},
        //     swf: 'static/video-js.swf' // 引入静态文件swf
        //   },
        //   html5: {hls: {withCredentials: false}},
        //   sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
        //     type: 'rtmp/hls',
        //     src: 'rtmp://192.168.1.101:1935/flash/22:YWRtaW46YWRtaW4='
        //   }],
        //   poster: "", //你的封面地址
        //   // width: document.documentElement.clientWidth,
        //   notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //   controlBar: {
        //     timeDivider: true,
        //     durationDisplay: true,
        //     remainingTimeDisplay: false,
        //     fullscreenToggle: true  //全屏按钮
        //   }
        // }
      }
    }
  }
</script>
<style scoped>

</style>