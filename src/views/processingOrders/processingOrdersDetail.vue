<template>
  <div class="all-info">
    <div class="car-position">
      <latest-track :latest-point="carPosition"></latest-track>
    </div>
    <div class="goods-video">
      <good-video :video-url = "orderData.videoHttpBack"></good-video>
    </div>
    <div class="driver-info">
      <driverInfo :driver-info = "driverData"></driverInfo>
    </div>
    <div class="goods-info">
      <goodsInfo :goods-info = "orderData"></goodsInfo>
    </div>
    <div class="temp-line">
      <!--      <tempLine></tempLine>-->
      <allSensors :temperatures = "temperatures" :humidity = "humidity"></allSensors>
    </div>
  </div>
</template>

<script>
  import LatestTrack from "./LatestTrack";
  import carTrack from "../../components/content/orderDetails/carTrack";
  import allSensors from "components/content/orderDetails/allSensors";
  import tempLine from "components/content/orderDetails/tempLine";
  import humiLine from "../../components/content/orderDetails/humiLine";
  import driverInfo from "components/content/orderDetails/driverInfo";
  import goodsInfo from "components/content/orderDetails/goodsInfo";
  import goodVideo from "../../components/content/orderDetails/goodVideo";

  import { getDriver, getLatestCarState } from "../../network/requestDatas";

  export default {
    name: "processingOrdersDetail",
    components: {
      LatestTrack,
      carTrack,
      allSensors,
      tempLine,
      humiLine,
      driverInfo,
      goodsInfo,
      goodVideo
    },
    data() {
      return{
        orderData:{},
        driverData:{},
        carPosition:[],
        temperatures:[],
        humidity:[],
      }
    },
    created(){
      // this.carPosition = [118,32]
      this.orderData = this.$route.query.order
      // console.log(this.$route);
    },
    mounted() {
      this.getDriverInfo()
      setInterval(() => {
        this.getCarStateData(this.orderData.id)
      },10*5000)
    },
    watch:{
      '$route'(to,from){
        if(this.$route.query.order !== undefined && this.$route.query.order !== "[object Object"){
          this.orderData = this.$route.query.order
          console.log(this.orderData);
          // console.log(this.$route);
          this.$forceUpdate()
        }
      }
    },
    methods:{
      getDriverInfo(){
        getDriver(this.orderData.driverId).then(res => {
          this.driverData = res.data
        }).catch(err => {
          console.log(err);
        } )
      },
      getCarStateData(orderId){
        getLatestCarState(orderId).then( res => {
          Vue.set(this.carPosition,0,res.data.longitude)
          Vue.set(this.carPosition,1,res.data.latitude)
          Vue.set(this.temperatures,0,res.data.temperature1)
          Vue.set(this.temperatures,1,res.data.temperature2)
          Vue.set(this.temperatures,2,res.data.temperature3)
          Vue.set(this.temperatures,3,res.data.temperature4)
          Vue.set(this.temperatures,4,res.data.temperature5)
          Vue.set(this.temperatures,5,res.data.temperature6)
          Vue.set(this.temperatures,6,res.data.temperature7)
          Vue.set(this.humidity,0,res.data.humidity1)
          Vue.set(this.humidity,1,res.data.humidity2)
          Vue.set(this.humidity,2,res.data.humidity3)
          Vue.set(this.humidity,3,res.data.humidity4)
          Vue.set(this.humidity,4,res.data.humidity5)
          Vue.set(this.humidity,5,res.data.humidity6)
          Vue.set(this.humidity,6,res.data.humidity7)
        })
      }
    }
  }
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.all-info{
  width: 100%;
  height: 100%;
}
.car-position{
  width: 620px;
  height: 410px;
  margin-bottom: 10px;
  /*padding-bottom: 10px;*/
  float: left;
}
.temp-line,.humi-line{
  width: 400px;
  height: 200px;
  float: right;
  margin-bottom: 10px;
}
.driver-info{
  width: 415px;
  height: 210px;
  float: left;
  background-color: #fff;
  /*background-color: #f02d2d;*/
  margin-right: 10px;
}
.goods-info{
  width: 415px;
  height: 215px;
  background-color: #fff;
  float: left;
}
.goods-video{
  width: 620px;
  height: 420px;
  /*background-color: #fff;*/
  float: right;
}

</style>