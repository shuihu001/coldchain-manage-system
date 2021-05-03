<template>
  <div id="container">

  </div>
</template>

<script>
  import AMap from 'AMap'
  export default {
    name: "carTrack",
    props:{
      points:{
        type:Array,
        default(){
          return []
        }
      },
      errorPoints: {
        type:Array,
        default() {
          return [];
        }
      }
    },
    data(){
      return{
        mapDemo:null,
        // points:[
        //    [117.635982, 36.696961]
        //   ,[117.635821, 36.697116]
        //   ,[117.635914, 36.697266]
        //   ,[117.611242, 36.67224]
        //   ,[117.606902, 36.673317]
        //   ,[117.601149, 36.674796]
        //   ,[117.595432, 36.676315]
        //   ,[117.589239, 36.677907]
        //   ,[117.5836, 36.679367]
        //   ,[117.578022, 36.680809]
        //   ,[117.573092, 36.682101]
        // ]
      }
    },
    watch:{
      points(){
        this.drawTrack(this.points, this.errorPoints)
      }
    },
    mounted() {
      this.drawTrack(this.points, this.errorPoints)
    },
    methods:{
      drawTrack(points,errorPoint){
        const that = this
         this.mapDemo = new AMap.Map('container',{
          zoom:14
        })
        this.mapDemo.setMapStyle('amap://styles/macaron')
        if(errorPoint.length > 0){
          for(let point in errorPoint){
            let marker = new AMap.Marker({
              position:point
            })
            this.mapDemo.add(marker)
          }
        }
        const numMAX = 39
        let time = Math.ceil(points.length/numMAX)
        for( let i=1; i<=time; i++){
          let segPoint = []
          for(let j=(i-1)*numMAX; j <= i*numMAX ;j++){
            if(points[j] !== undefined){
              segPoint.push(points[j])
            }
          }
          AMap.convertFrom(segPoint,'gps',  function (status,result) {
            if(result.info == 'ok') {
              console.log(result.locations);
              that.mapDemo = new AMap.Map('container',{
                zoom:13
              })
              that.mapDemo.setMapStyle('amap://styles/macaron')
              let polyLine = new AMap.Polyline({
                path: result.locations,
                isOutline: false,
                showDir:true,
                strokeColor: "#3366FF",
                strokeOpacity: 1,
                strokeWeight: 5,
                strokeStyle: "solid",
                strokeDasharray: [10, 5],
                lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50,
              })
              polyLine.setMap(that.mapDemo)
              that.mapDemo.setFitView()
            }
          })
        }
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