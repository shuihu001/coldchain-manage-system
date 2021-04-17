<template>
  <div class="all-info">
    <div class="car-position">
<!--      <latest-track :latest-point="carPosition"></latest-track>-->
      <latest-track :order-id="orderData.id" :key="orderData.id"></latest-track>
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
    <div class="all-sensors">
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

  import {getCarState, getDriver, getLatestCarState} from "../../network/requestDatas";
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
      this.orderData = JSON.parse(this.$route.query.order)
      this.getDriverInfo()
      this.getCarStateData(this.orderData.id)
      setInterval(() => {
        this.getCarStateData(this.orderData.id)
      },60*1000)
    },
    mounted() {

    },
    watch:{
      '$route'(to,from){
        // console.log(this.$route);
        // console.log(this.$route.query.order);
        if(this.$route.query.order != undefined){
          this.orderData = JSON.parse(this.$route.query.order)
          // console.log(this.orderData);
          this.getDriverInfo()
          this.getCarStateData(this.orderData.id)
          setInterval(() => {
            this.getCarStateData(this.orderData.id)
          },60*1000)
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
          // console.log(res.data);
          // console.log(res.data[0]);
          this.$set(this.carPosition,0,res.data.longitude)
          this.$set(this.carPosition,1,res.data.latitude)
          this.$set(this.temperatures,0,res.data.temperature1)
          this.$set(this.temperatures,1,res.data.temperature2)
          this.$set(this.temperatures,2,res.data.temperature3)
          this.$set(this.temperatures,3,res.data.temperature4)
          this.$set(this.temperatures,4,res.data.temperature5)
          this.$set(this.temperatures,5,res.data.temperature6)
          this.$set(this.temperatures,6,res.data.temperature7)
          this.$set(this.humidity,0,res.data.humidity1)
          this.$set(this.humidity,1,res.data.humidity2)
          this.$set(this.humidity,2,res.data.humidity3)
          this.$set(this.humidity,3,res.data.humidity4)
          this.$set(this.humidity,4,res.data.humidity5)
          this.$set(this.humidity,5,res.data.humidity6)
          this.$set(this.humidity,6,res.data.humidity7)
          // console.log(JSON.stringify(this.carPosition));
          // this.carPosition = JSON.stringify(this.carPosition)
          // console.log(this.carPosition);
          // this.carPosition = JSON.parse(this.carPosition)
          // console.log(JSON.stringify(this.carPosition));
        })
      },
      getAllCarState(){
        getCarState(id).then(res => {
          let  path = []
          for(let record of res.data){
            let point = []
            if(record.longitude !== null  && record.latitude !== null){
              this.$set(point,0,record.longitude)
              this.$set(point,1,record.latitude)
              path.push(point)
            }
          }
          let line = {id:'',path:[]}
          this.$set(line,"id",order.id)
          this.$set(line,"path",path)
          this.lines.push(line)
          console.log(this.lines);
        }).catch(err => {
          console.log(err);
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
  width: 49%;
  height: 410px;
  margin-bottom: 10px;
  /*padding-bottom: 10px;*/
  float: left;
}
.all-sensors{
  width: 33%;
  height: 200px;
  float: right;
  margin-bottom: 10px;
}
.driver-info{
  width: 33%;
  height: 210px;
  float: left;
  background-color: #fff;
  /*background-color: #f02d2d;*/
  margin-right: 10px;
}
.goods-info{
  width: 33%;
  height: 215px;
  background-color: #fff;
  float: left;
}
.goods-video{
  width: 49%;
  height: 420px;
  /*background-color: #fff;*/
  float: right;
}

</style>