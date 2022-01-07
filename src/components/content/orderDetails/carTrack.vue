<template>
  <div id="map-container">

  </div>
</template>

<script>
  import AMap from 'AMap'
// import func from 'vue-editor-bridge';
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
        paths: []
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
        console.log(JSON.parse(JSON.stringify(this.points)));
        setTimeout(() => {
          this.drawTrack(this.points, this.errorPoints)
        })
      }
    },
    created() {

    },
    mounted() {
      // console.log("创建了");
      // console.log(JSON.parse(JSON.stringify(this.points)));
      // this.drawTrack(this.points, this.errorPoints)
      // console.log("在created成功了");
    },
    destroyed() {
      console.log("被破坏了");
    },
    methods:{
      drawTrack(points,errorPoint){
        const that = this
        this.mapDemo = new AMap.Map('map-container',{
          zoom:14
        })
        this.mapDemo.setMapStyle('amap://styles/macaron')
        AMap.convertFrom(points[0],'gps',  function (status,result) {
        if(result.info == 'ok') {
          console.log(result.locations[0]);
          const startIcon = new AMap.Icon({
        // size: (60,60),
            size: new AMap.Size(25, 34),
            image: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
            imageSize: new AMap.Size(25, 34),
          })
          const startingMarker = new AMap.Marker({
            icon: startIcon,
            position: result.locations[0],
            offset: new AMap.Pixel(-10, -34)
          })
          startingMarker.setMap(that.mapDemo)
        }
      })
      AMap.convertFrom(points[points.length -1],'gps',  function (status,result) {
          if(result.info == 'ok') {
            const endIcon = new AMap.Icon({
          // size: (60,60),
              size: new AMap.Size(25, 34),
              image: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
              imageSize: new AMap.Size(25, 34),
            })
            const destinationMarker = new AMap.Marker({
              icon: endIcon,
              position: result.locations[0],
              offset: new AMap.Pixel(-10, -34)
            })
            destinationMarker.setMap(that.mapDemo)
          }
        })
        if(errorPoint.length > 0){
          for(let point in errorPoint){
            let marker = new AMap.Marker({
              position:point
            })
            this.mapDemo.add(marker)
          }
        }
        const numMAX = 39
        console.log(points);
        let time = Math.ceil(points.length/numMAX)
        // console.log(JSON.parse(JSON.stringify(points)));
        that.paths = []
        for( let i=1; i<=time; i++){
          let segPoint = []
          for(let j=(i-1)*numMAX; j <= i*numMAX ;j++){
            if(points[j] !== undefined){
              segPoint.push(points[j])
            }
          }
          // console.log(JSON.parse(JSON.stringify(points)));
          AMap.convertFrom(segPoint,'gps',  function (status,result) {
            if(result.info == 'ok') {
              that.paths.push(...result.locations)
              // console.log(JSON.parse(JSON.stringify(result.locations)));
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
        setTimeout(() => {
          console.log(that.paths);
          console.log("执行了");
          // that.mapDemo.plugin("AMap.DragRoute", function() {
          //   let route = new AMap.DragRoute(that.mapDemo, that.paths, AMap.DrivingPolicy.LEAST_TIME,{
          //     midMarkerOptions:{visible:false}
          //   }); 
          //   route.search(); 
          //   console.log(route.getWays());
          //   console.log(route.getRoute());
          // })
          // AMapUI.load(['ui/misc/PathSimplifier'], function(PathSimplifier){
          //   if (!PathSimplifier.supportCanvas) {
          //     alert('当前环境不支持 Canvas！');
          //     return;
          //   }
          //   const pathSimplifierIns = new PathSimplifier({
          //     zIndex: 100,
          //     map: that.mapDemo, //所属的地图实例
          //     getPath: function(pathData, pathIndex) {
          //       //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
          //       return pathData.path;
          //     },
          //     renderOptions: {
          //       //轨迹线的样式
          //       pathLineStyle: {
          //         strokeStyle: 'red',
          //         lineWidth: 6,
          //         dirArrowStyle: true
          //       }
          //     }
          //   });
          //   pathSimplifierIns.setData([{
          //     name: '轨迹0',
          //     path: that.paths
          //   }]);
          //   var navg0 = pathSimplifierIns.createPathNavigator(0, //关联第1条轨迹
          //     {
          //       loop: true, //循环播放
          //       speed: 10000
          //     });
          //   navg0.start();
          // })
        }, 2000);
      }
    }
  }
</script>

<style scoped>
  #map-container{
    width: 100%;
    height: 100%;
  }
</style>