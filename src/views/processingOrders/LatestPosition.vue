<template>
  <div id="container">

  </div>
</template>

<script>
  import { getCarState, getLatestCarState } from "../../network/requestDatas";
  import AMap from 'AMap'
  export default {
    name: "LatestPosition",
    props:{
      orderId:{
        type:Number,
        default() {
          return 1020000000000;
        }
      }
    },
    data(){
      return{
        mapDemo:null,
        timer:null,
        path:[]
      }
    },
    created() {
      console.log(this.orderId+"创建了");
      this.getPositions(this.orderId)
      this.timer = setInterval( () => {
        this.mapDemo = null
        this.getLatestPosition(this.orderId)
      },10*1000)
      this.$once('hook:beforeDestroy',() => {
        clearInterval(this.timer)
        this.mapDemo = null
        console.log("定时器被销毁");
      })
    },
    mounted() {

    },
    // deactivated() {
    //   this.mapDemo = null
    //   clearInterval(this.timer)
    //   this.timer = null
    //   console.log(this.orderId+"不活跃了");
    // },
    // beforeDestroy() {
    //   clearInterval(this.timer)
    //   this.timer = null
    // },
    destroyed() {
      console.log(this.orderId+"被销毁了");
      clearInterval(this.timer)
      this.timer = null
    },
    watch:{
      // orderId(){
      //   console.log("id变了");
      //   console.log("id变了");
      //   console.log(this.orderId+"监听器");
      //   this.getPositions(this.orderId)
      //   this.timer = setInterval(() => {
      //     this.getLatestPosition(this.orderId)
      //   },60*1000)
      // }
    },
    methods:{
      getPositions(id){
        const that = this
        getCarState(id).then(async res => {
          // this.path = []
          for(let record of await res.data){
            let point = []
            if(record.longitude !== null  && record.latitude !== null){
              this.$set(point,0,record.longitude)
              this.$set(point,1,record.latitude)
              this.path.push(point)
            }
          }
          const numMAX = 39
          let time = Math.ceil(this.path.length / numMAX)
          for (let i = 1; i <= time; i++) {
            let segPoint = []
            for (let j = (i-1)*numMAX; j <= i * numMAX; j++) {
              if(this.path[j] !== undefined){
                segPoint.push(this.path[j])
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
        }).catch(err => {
          console.log(err);
        })
      },
      getLatestPosition(id){
        const that = this
        getLatestCarState(id).then(res => {
          if(res.data.longitude !== null  && res.data.latitude !== null){
            let point = new AMap.LngLat(res.data.longitude,res.data.latitude)
            this.path.push(point)
          }
          const numMAX = 39
          let time = Math.ceil(this.path.length / numMAX)
          for (let i = 1; i <= time; i++) {
            let segPoint = []
            for (let j = (i-1)*numMAX; j <= i * numMAX; j++) {
              if(this.path[j] !== undefined){
                segPoint.push(this.path[j])
              }
            }
            AMap.convertFrom(segPoint,'gps',  function (status,result) {
              if(result.info == 'ok') {
                console.log(result.locations);
                console.log(that.orderId);
                console.log(that.timer);
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
        }).catch(err => {
          console.log(err);
        })
      },
    }
  }
</script>

<style scoped>
  #container{
    width: 100%;
    height: 100%;
  }
</style>