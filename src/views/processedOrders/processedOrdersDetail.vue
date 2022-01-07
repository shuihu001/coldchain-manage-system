<template>
  <div class="all-info">
    <div class="car-position">
      <car-track :points = "carPosition" :key="orderData.id"></car-track>
    </div>
    <div class="goods-info">
      <goods-info :goods-info = "orderData"></goods-info>
    </div>
    <!-- <div class="driver-info">
      <driver-info :driver-info = "driverData"></driver-info>
    </div> -->
    <div class="temp-line">
      <temp-line :temperature = "temperatures" :create-time = "createTime"></temp-line>
    </div>
    <div class="humi-line">
      <humi-Line :humidity = "humidity" :create-time = "createTime"></humi-Line>
    </div>
    <div class="average-temperature">
      <average-temperature :average-temperature = "averageTemperature" :create-time = "createTime"></average-temperature>
    </div>
    <div class="average-humidity">
      <average-humidity :average-humidity = "averageHumidity" :create-time = "createTime"></average-humidity>
    </div>
    <!-- <div class="images"> -->
    <div class="license-image">
      <h3 style="text-align:center">动物检验合格证</h3>
      <licenseImage :fileId="orderData.quarantineCertificateId"/>
    </div>
    <div class="driver-image">
      <h3 style="text-align:center">司机照片</h3>
      <driverImage :fileId="orderData.meatQualityInspectionId"/>
    </div>
    <!-- </div> -->
<!--    <div class="driver-info">-->
<!--      <driver-info :driver-info = "driverData"></driver-info>-->
<!--    </div>-->
<!--    <div class="goods-info">-->
<!--      <goods-info :goods-info = "orderData"></goods-info>-->
<!--    </div>-->
<!--    <div class="goods-video">-->
<!--      <good-video :video-url = "orderData.videoHttpBack"></good-video>-->
<!--    </div>-->
  </div>
</template>

<script>
  import carTrack from "../../components/content/orderDetails/carTrack";
  import allSensors from "components/content/orderDetails/allSensors";
  import tempLine from "components/content/orderDetails/tempLine";
  import humiLine from "../../components/content/orderDetails/humiLine";
  import driverInfo from "components/content/orderDetails/driverInfo";
  import goodsInfo from "components/content/orderDetails/goodsInfo";
  import goodVideo from "../../components/content/orderDetails/goodVideo";
  import averageTemperature from "../../components/content/orderDetails/averageTemperature";
  import averageHumidity from "../../components/content/orderDetails/averageHumidity";
  import licenseImage from "../../components/content/orderDetails/licenseImage.vue"
  import driverImage from "../../components/content/orderDetails/driverImage.vue"
  import {getDriver, getCarState} from "../../network/requestDatas";
  export default {
    name: "processedOrdersDetail",
    components:{
      carTrack,
      allSensors,
      tempLine,
      humiLine,
      driverInfo,
      goodsInfo,
      goodVideo,
      averageTemperature,
      averageHumidity,
      licenseImage,
      driverImage
    },
    data() {
      return{
        orderData:{},
        driverData:{},
        carPosition:[],
        createTime:[],
        temperatures:{
          temperature1:[],
          temperature2:[],
          temperature3:[],
          temperature4:[],
          temperature5:[],
          temperature6:[],
        },
        averageTemperature:[],
        humidity:{
          humidity1:[],
          humidity2:[],
          humidity3:[],
          humidity4:[],
          humidity5:[],
          humidity6:[],
        },
        averageHumidity:[],
      }
    },
    created() {
      console.log(this.$route);
      this.orderData = JSON.parse(this.$route.query.order) 
      this.getDriverInfo()
      this.getCarStateData(this.orderData.id)
    },
    destroyed() {
      console.log("被销毁了");
    },
    watch:{
      '$route'(to,from){
        if(this.$route.query.order !== undefined){
          this.orderData = JSON.parse(this.$route.query.order);
          this.getDriverInfo();
          this.getCarStateData(this.orderData.id);
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
        getCarState(orderId).then(res => {
          this.carPosition = []
          this.createTime = []
          this.averageTemperature = []
          this.averageHumidity = []
          for(let index in this.temperatures){
            this.temperatures[index] = []
          }
          for(let index in this.humidity){
            this.humidity[index] = []
          }
          for(let state of res.data){
            if(state.longitude > 0 && state.latitude > 0) {
              let point = []
              this.$set(point,0,state.longitude)
              this.$set(point,1,state.latitude)
              this.carPosition.push(point)
            }
            this.createTime.push(state.createTime)
            if (state.temperature1<100){
              this.temperatures.temperature1.push(state.temperature1)
            }else{
              this.temperatures.temperature1.push("")
            }
            if (state.temperature2<100){
              this.temperatures.temperature2.push(state.temperature2)
            }else{
              this.temperatures.temperature2.push("")
            }
            if (state.temperature3<100){
              this.temperatures.temperature3.push(state.temperature3)
            }else{
              this.temperatures.temperature3.push("")
            }
            if (state.temperature4<100){
              this.temperatures.temperature4.push(state.temperature4)
            }else{
              this.temperatures.temperature4.push("")
            }
            if (state.temperature5<100){
              this.temperatures.temperature5.push(state.temperature5)
            }else{
              this.temperatures.temperature5.push("")
            }
            if (state.temperature6<100){
              this.temperatures.temperature6.push(state.temperature6)
            }else{
              this.temperatures.temperature6.push("")
            }
            
            
            // this.temperatures.temperature3.push(state.temperature3)
            // this.temperatures.temperature4.push(state.temperature4)
            // this.temperatures.temperature5.push(state.temperature5)
            // this.temperatures.temperature6.push(state.temperature6)
            // this.temperatures.temperature7.push(state.temperature7)
            // this.averageTemperature.push((state.temperature1*1 + state.temperature2*1 + state.temperature3*1 + state.temperature4*1 + state.temperature5*1 + state.temperature6*1 )/6)
            if (state.humidity1<100){
              this.humidity.humidity1.push(state.humidity1)
            }else{
              this.humidity.humidity1.push("")
            }
            if (state.humidity2<100){
              this.humidity.humidity2.push(state.humidity2)
            }else{
              this.humidity.humidity2.push("")
            }
            if (state.humidity3<100){
              this.humidity.humidity3.push(state.humidity3)
            }else{
              this.humidity.humidity3.push("")
            }
            if (state.humidity4<100){
              this.humidity.humidity4.push(state.humidity4)
            }else{
              this.humidity.humidity4.push("")
            }
            if (state.humidity5<100){
              this.humidity.humidity5.push(state.humidity5)
            }else{
              this.humidity.humidity5.push("")
            }
            if (state.humidity6<100){
              this.humidity.humidity6.push(state.humidity6)
            }else{
              this.humidity.humidity6.push("")
            }
            // this.humidity.humidity1.push(state.humidity1)
            // this.humidity.humidity2.push(state.humidity2)
            // this.humidity.humidity3.push(state.humidity3)
            // this.humidity.humidity4.push(state.humidity4)
            // this.humidity.humidity5.push(state.humidity5)
            // this.humidity.humidity6.push(state.humidity6)
            // this.averageHumidity.push((state.humidity1*1 + state.humidity2*1 + state.humidity3*1 + state.humidity4*1 + state.humidity5*1 + state.humidity6*1 )/6)
          }
          for(let i = 0; i< this.temperatures.temperature1.length; i++){
            let arr = []
            if(this.temperatures.temperature1[i] !== ""){
              arr.push(this.temperatures.temperature1[i]*1)
            }
            if(this.temperatures.temperature2[i] !== ""){
              arr.push(this.temperatures.temperature2[i]*1)
            }
            if(this.temperatures.temperature3[i] !== ""){
              arr.push(this.temperatures.temperature3[i]*1)
            }
            if(this.temperatures.temperature4[i] !== ""){
              arr.push(this.temperatures.temperature4[i]*1)
            }
            if(this.temperatures.temperature5[i] !== ""){
              arr.push(this.temperatures.temperature5[i]*1)
            }
            if(this.temperatures.temperature6[i] !== ""){
              arr.push(this.temperatures.temperature6[i]*1)
            }
            let sum = 0
            for(let tem of arr){
              sum += tem
            }
            this.averageTemperature.push(sum/arr.length)
          }
          for(let i = 0; i< this.humidity.humidity1.length; i++){
            let arr = []
            if(this.humidity.humidity1[i] !== ""){
              arr.push(this.humidity.humidity1[i]*1)
            }
            if(this.humidity.humidity2[i] !== ""){
              arr.push(this.humidity.humidity2[i]*1)
            }
            if(this.humidity.humidity3[i] !== ""){
              arr.push(this.humidity.humidity3[i]*1)
            }
            if(this.humidity.humidity4[i] !== ""){
              arr.push(this.humidity.humidity4[i]*1)
            }
            if(this.humidity.humidity5[i] !== ""){
              arr.push(this.humidity.humidity5[i]*1)
            }
            if(this.humidity.humidity6[i] !== ""){
              arr.push(this.humidity.humidity6[i]*1)
            }
            let sum = 0
            for(let tem of arr){
              sum += tem
            }
            this.averageHumidity.push(sum/arr.length)
          }
          this.createTime = this.createTime.map((time) => {
            let date = new Date(time)
            let targetTime = new Date(date.getTime() + 8*60*60*1000)
            let y = targetTime.getFullYear()
            let M = (targetTime.getMonth() + 1).toString()
            M = M < 10 ? "0"+M : M
            let d = targetTime.getDate()
            d = d < 10 ? "0" + d : d
            let h = targetTime.getHours()
            h = h < 10 ? "0" + h : h
            let m = targetTime.getMinutes()
            m = m < 10 ? "0" + m : m
            let s = targetTime.getSeconds()
            s = s < 10 ? "0" + s : s
            return  y+"-"+ M +"-"+d+" "+h+":"+m+":"+s
          })
        })
      }
    }
  }
</script>

<style scoped>
  .all-info{
    width: 100%;
    height: 100%;
  }
  .car-position{
    width: 66%;
    height: 410px;
    margin-bottom: 10px;
    float: left;
  }
  .temp-line,.humi-line{
    width: 49%;
    height: 300px;
    float: left;
    margin-left: 5px;
    margin-bottom: 10px;
  }
  .goods-info,.driver-info{
    width: 33%;
    height: 410px;
    float: right;
    margin-left: 5px;
    margin-bottom: 10px;
    background-color: #fff;
  }
  .average-temperature,.average-humidity{
    width: 49%;
    height: 300px;
    float: left;
    margin-left: 5px;
    margin-bottom: 10px;
  }
  /*.goods-info{*/
  /*  width: 33%;*/
  /*  height: 200px;*/
  /*  background-color: #fff;*/
  /*  float: left;*/
  /*}*/
  /*.driver-info{*/
  /*  width: 33%;*/
  /*  height: 200px;*/
  /*  float: left;*/
  /*  background-color: #fff;*/
  /*  margin-right: 3px;*/
  /*}*/
  /*.goods-info{*/
  /*  width: 33%;*/
  /*  height: 200px;*/
  /*  background-color: #fff;*/
  /*  float: left;*/
  /*}*/
  .goods-video{
    width: 33%;
    height: 200px;
    background-color: #fff;
    margin-left: 5px;
    float: right;
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