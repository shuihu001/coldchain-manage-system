<template>
  <div id="container">

  </div>
</template>

<script>
  import AMap from 'AMap'
  export default {
    name: "LatestTrack",
    props:{
      latestPoint:{
        type:Array
      }
    },
    data(){
      return{
        oldPoint:[],
      }
    },
    mounted() {
      this.oldPoint[0] = this.latestPoint[0]
      this.oldPoint[1] = this.latestPoint[1]
      this.drawLine()
    },
    methods:{
      drawLine(){
        const mapDemo = new AMap.Map('container',{
          center: [117.573092, 36.682101],
          zoom:13
        })
        mapDemo.setMapStyle('amap://styles/macaron')
        setInterval(() => {
          const pathPoints = []
          pathPoints.push(this.oldPoint)
          pathPoints.push(this.latestPoint)
          let polyLine = new AMap.Polyline({
            path:pathPoints,
            isOutline:false,
            // outlineColor: '#ffeeff',
            // borderWeight:3,
            strokeColor: "#3366FF",
            strokeOpacity: 1,
            strokeWeight: 5,
            // 折线样式还支持 'dashed'
            strokeStyle: "solid",
            // strokeStyle是dashed时有效
            strokeDasharray: [10, 5],
            lineJoin: 'round',
            lineCap: 'round',
            zIndex: 50,
          })
          polyLine.setMap(mapDemo)
          mapDemo.setFitView([polyLine])
          this.oldPoint[0] = this.latestPoint[0]
          this.oldPoint[1] = this.latestPoint[1]
        },5000)

        }
      }
  }
</script>

<style scoped>
  #container{
    width: 100%;
    height: 100%;
  }
</style>