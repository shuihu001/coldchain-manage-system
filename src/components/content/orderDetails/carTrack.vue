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
      points:function(newValue){
        console.log(newValue);
        // console.log(oldValue);
        console.log("points变了");
        this.drawTrack(newValue, this.errorPoints)
      }
    },
    mounted() {
      setTimeout(() => {
        this.drawTrack(this.points, this.errorPoints)
      },500)

    },
    methods:{
      // convertPos(points){
      //   AMap.convertFrom(points,'gps',function (status,result) {
      //     if(result.info === "ok"){
      //
      //     }
      //   })
      // },
      drawTrack(points,errorPoint){
        // console.log(this.points);
        // console.log(this.errorPoint);
        const mapDemo = new AMap.Map('container',{
          zoom:14
        })
        mapDemo.setMapStyle('amap://styles/macaron')
        if(errorPoint){
          for(let point in errorPoint){
            let marker = new AMap.Marker({
              position:point
            })
            mapDemo.add(marker)
          }
        }
        const numMAX = 300
        // console.log(points);
        // console.log(points instanceof Array);
        console.log(points.length);
        let time = Math.ceil(points.length/numMAX)
        console.log(time);
        for( let i=1; i<=time; i++){
          let segPoint = []
          for(let j=(i-1)*numMAX;  j <= i*numMAX ;j++){
            // console.log(points[j]);
            if(points[j] !== undefined){
              segPoint.push(points[j])
            }
          }
          // console.log(segPoint);
          // console.log("画图");
          let polyLine = new AMap.Polyline({
            path:segPoint,
            isOutline:false,
            strokeColor: "#3366FF",
            strokeOpacity: 1,
            strokeWeight: 5,
            strokeStyle: "solid",
            strokeDasharray: [10, 5],
            lineJoin: 'round',
            lineCap: 'round',
            zIndex: 50,
          })
          console.log("没问题");
          mapDemo.add(polyLine)
          // polyLine.setMap(mapDemo)
          console.log("没问题");
          mapDemo.setFitView([polyLine])
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