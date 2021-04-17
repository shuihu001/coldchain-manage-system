<template>
  <div id="container">

  </div>
</template>

<script>
  import { getCarState, getLatestCarState } from "../../network/requestDatas";
  import AMap from 'AMap'
  export default {
    name: "LatestTrack",
    props:{
      latestPoint:{
        type:Array,
        default(){
          return [116.5,39.6]
        }
      },
      orderId:{
        type:Number,
        default() {
          return 1020000000000;
        }
      }
    },
    data(){
      return{
        // oldPoint:[],
        mapDemo:'',
        timer:'',
        path:[]
      }
    },
    created() {
      console.log(this.orderId+"创建了");
      getCarState(this.orderId).then(async res => {
        this.path = []
        for(let record of await res.data){
          // console.log(record);
          let point = []
          if(record.longitude !== null  && record.latitude !== null){
            this.$set(point,0,record.longitude)
            this.$set(point,1,record.latitude)
            this.path.push(point)
          }
        }
        console.log(this.path);
      }).catch(err => {
        console.log(err);
      })
      this.timer = setInterval( () => {
        getLatestCarState(this.orderId).then(async res => {
          if(res.data.longitude !== null  && res.data.latitude !== null){
            let point = new AMap.LngLat(res.data.longitude,res.data.latitude)
            this.path.push(point)
            console.log(point);
            console.log(JSON.parse(JSON.stringify(point)));
          }

        }).catch(err => {
          console.log(err);
        })
        setTimeout(() => {
          this.drawLine(this.path)
        },200)
      },10*1000)
    },
    destroyed() {
      console.log(this.orderId+"被销毁了");
      clearInterval(this.timer)
      this.timer = null
    },
    deactivated() {
      this.mapDemo = null
      clearInterval(this.timer)
      this.timer = null
      console.log(this.orderId+"不活跃了");
    },
    watch:{
      orderId(){
        getCarState(this.orderId).then(res => {
          this.path = []
          for(let record of res.data){
            // console.log(record);
            let point = []
            if(record.longitude !== null  && record.latitude !== null){
              this.$set(point,0,record.longitude)
              this.$set(point,1,record.latitude)
              this.path.push(point)
            }
          }
          console.log(this.path);
        }).catch(err => {
          console.log(err);
        })
        setTimeout(() => {
          this.drawLine(this.path)
        },200)
        this.timer = setInterval(() => {
          getLatestCarState(this.orderId).then(res => {
            // console.log(res.data);
            // console.log(res.data.latitude);
            let point = []
            if(res.data.longitude !== null  && res.data.latitude !== null){
              this.$set(point,0,res.data.longitude)
              this.$set(point,1,res.data.latitude)
              // console.log(point);
              this.path.push(point)
              // console.log(line.path);
            }
          }).catch(err => {
            console.log(err);
          })
          setTimeout(() => {
            this.drawLine(this.path)
          },200)
        },60*1000)
      }
    },
    mounted() {
      setTimeout(() => {
        this.drawLine(this.path)
      },200)
    },
    methods:{
      drawLine(pathPoints){
        this.mapDemo = new AMap.Map('container',{
          zoom:13
        })
        // console.log(this.latestPoint);
        this.mapDemo.setMapStyle('amap://styles/macaron')
        let polyLine = new AMap.Polyline({
            path:pathPoints,
            isOutline:false,
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
        polyLine.setMap(this.mapDemo)
        this.mapDemo.setFitView()
          // this.oldPoint[0] = this.latestPoint[0]
          // this.oldPoint[1] = this.latestPoint[1]
        // },5000)
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