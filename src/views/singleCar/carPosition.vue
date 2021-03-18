<template>
  <div id="container">

  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  name: "carPosition",
  data(){
    return{
      pos:[115.3562,38.854],
      siteInfo:[
        {keyword:'河北省图书馆',city:'石家庄'},
        {keyword:'北京西站',city:'北京'},
      ]
    }
  },
  methods:{
    drawMap(){
      const mapDemo = new AMap.Map('container')
      mapDemo.setMapStyle('amap://styles/macaron')
      let marker = new AMap.Marker({
        position:this.pos
      })
      mapDemo.add(marker)
      AMap.convertFrom(this.pos,'gps',function (status,result) {
        if(result.info === 'ok'){
          const newMarker = new AMap.Marker({
            position:[result.locations[0].R,result.locations[0].Q]
          })
          mapDemo.add(newMarker)
          console.log(result.locations[0])
        }
      })
      let twoPoint = this.siteInfo
      mapDemo.plugin('AMap.Driving', function () {
        const driving = new AMap.Driving({
          policy: AMap.DrivingPolicy.LEAST_TIME,
          map: mapDemo
        })
        driving.search(twoPoint, function (status, result) {
          if (status === 'complete') {
            console.log('绘制驾车路线完成');
          } else {
            console.log('绘制驾车路线失败' + result)
          }
          mapDemo.addControl(driving)
        })
      })
    }
  },
  mounted() {
    this.drawMap()
  }
}
</script>

<style scoped>
  #container{
    width: 100%;
    height: 100%;
  }
</style>