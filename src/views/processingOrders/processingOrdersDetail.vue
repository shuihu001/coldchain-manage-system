<template>
  <div class="all-info">
    <div class="car-position">
      <latest-position :order-id="orderData.id" :key="orderData.id"></latest-position>
    </div>
    <div class="goods-info">
      <goodsInfo :goods-info = "orderData"></goodsInfo>
    </div>
    <div class="goods-video">
<!--      <good-video :video-url = "orderData.videoHttpBack"></good-video>-->
      <good-video :video-url = "URL"></good-video>
      <!-- <video src="http://coldchain-vehicle.oss-cn-beijing.aliyuncs.com/record/vehicle/secondVideo/2021-11-09-14-48-37_2021-11-09-14-49-52.mp4"></video> -->
    </div>
    <!-- <div class="driver-info">
      <driverInfo :driver-info = "driverData"></driverInfo>
    </div> -->
    
    <div class="all-sensors">
      <allSensors :temperatures = "temperatures" :humidity = "humidity"></allSensors>
    </div>
    <div class="license-image">
      <h3 style="text-align:center">动物检验合格证</h3>
      <licenseImage :fileId="orderData.quarantineCertificateId"/>
    </div>
    <div class="driver-image">
      <h3 style="text-align:center">司机照片</h3>
      <driverImage :fileId="orderData.meatQualityInspectionId"/>
    </div>
    <!-- <div>
      <cubicCar/>
    </div> -->
  </div>
</template>

<script>
  import LatestPosition from "./LatestPosition";
  import allSensors from "components/content/orderDetails/allSensors";
  import tempLine from "components/content/orderDetails/tempLine";
  import humiLine from "../../components/content/orderDetails/humiLine";
  import driverInfo from "components/content/orderDetails/driverInfo";
  import goodsInfo from "components/content/orderDetails/goodsInfo";
  import goodVideo from "../../components/content/orderDetails/goodVideo";
  import cubicCar from "../../components/content/orderDetails/cubicCar.vue"
  import licenseImage from "../../components/content/orderDetails/licenseImage.vue"
  import driverImage from "../../components/content/orderDetails/driverImage.vue"
  import {getCarState, getDriver, getLatestCarState} from "../../network/requestDatas";
  export default {
    name: "processingOrdersDetail",
    components: {
      LatestPosition,
      allSensors,
      tempLine,
      humiLine,
      driverInfo,
      goodsInfo,
      goodVideo,
      cubicCar,
      licenseImage,
      driverImage
    },
    data() {
      return{
        // URL:"http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8",
        orderData:{},
        driverData:{},
        carPosition:[],
        temperatures:[],
        humidity:[],
      }
    },
    computed: {
      URL () {
        return this.orderData.videoHttpBack
      }
    },
    created(){
     
      this.orderData = JSON.parse(this.$route.query.order)
      console.log(this.orderData);
      console.log(this.orderData.videoHttpBack);
      console.log(this.URL);
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
        if(this.$route.query.order !== undefined){
          this.orderData = JSON.parse(this.$route.query.order)
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
          console.log(res);
          if(res.data !== null) {
            // this.$set(this.carPosition,0,res.data.longitude)
            // this.$set(this.carPosition,1,res.data.latitude)
            this.$set(this.temperatures,0,res.data.temperature1)
            this.$set(this.temperatures,1,res.data.temperature2)
            this.$set(this.temperatures,2,res.data.temperature3)
            this.$set(this.temperatures,3,res.data.temperature4)
            this.$set(this.temperatures,4,res.data.temperature5)
            this.$set(this.temperatures,5,res.data.temperature6)
            // this.$set(this.temperatures,6,res.data.temperature7)
            this.$set(this.humidity,0,res.data.humidity1)
            this.$set(this.humidity,1,res.data.humidity2)
            this.$set(this.humidity,2,res.data.humidity3)
            this.$set(this.humidity,3,res.data.humidity4)
            this.$set(this.humidity,4,res.data.humidity5)
            this.$set(this.humidity,5,res.data.humidity6)
            // this.$set(this.humidity,6,res.data.humidity7)
          }
          
        })
      },
      getAllCarState(){
        getCarState(id).then(res => {
          let  path = []
          for(let record of res.data){
            let point = []
            if(record.longitude > 0  && record.latitude > 0){
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
  width: 66%;
  height: 410px;
  margin-bottom: 10px;
  /*padding-bottom: 10px;*/
  float: left;
}
.all-sensors{
  width: 49%;
  height: 410px;
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
  height: 410px;
  background-color: #fff;
  float: right;
}
.goods-video{
  width: 49%;
  height: 420px;
  /*background-color: #fff;*/
  float: left;
}
.license-image{
  background-color: #fff;
  width: 49%;
  height: 450px;
  float: left;
  padding: 10px;
  box-sizing: border-box;
}
.driver-image{
  background-color: #fff;
  width: 49%;
  height: 450px;
  float: left;
  padding: 10px;
  box-sizing: border-box;
  margin-left: 10px;
}
</style>