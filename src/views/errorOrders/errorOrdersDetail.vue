<template>
  <div class="all-info">
    <div class="car-position">
      <car-track :points = "carPosition" :errorPoints = "errorPoints"></car-track>
    </div>
    <div class="goods-info">
      <goods-info :goods-info = "orderData"></goods-info>
    </div>
    <div class="driver-info">
      <driver-info :driver-info = "driverData"></driver-info>
    </div>
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

  import {getDriver, getCarState, getErrorOrderData} from "../../network/requestDatas";

  export default {
    name: "errorOrdersDetail",
    components:{
      carTrack,
      allSensors,
      tempLine,
      humiLine,
      driverInfo,
      goodsInfo,
      goodVideo,
      averageTemperature,
      averageHumidity
    },
    data(){
      return{
        orderData:{},
        driverData:{},
        carPosition:[],
        createTime:[],
        errorPoints:[],
        temperatures:{
          temperature1:[],
          temperature2:[],
          temperature3:[],
          temperature4:[],
          temperature5:[],
          temperature6:[],
          temperature7:[],
        },
        averageTemperature:[],
        humidity:{
          humidity1:[],
          humidity2:[],
          humidity3:[],
          humidity4:[],
          humidity5:[],
          humidity6:[],
          humidity7:[],
        },
        averageHumidity:[],
      }
    },
    created() {
      this.orderData = JSON.parse(this.$route.query.order)
      this.getDriverInfo()
      this.getCarStateData(this.orderData.id)
      this.getErrorPoints()
    },
    mounted() {

    },
    watch:{
      '$route'(to,from){
        if(this.$route.query.order !== undefined){
          this.orderData = JSON.parse(this.$route.query.order)
          this.getDriverInfo()
          this.getCarStateData(this.orderData.id)
          this.getErrorPoints()
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
        getCarState(orderId).then( res => {
          console.log(res.data);
          console.log(res.data[0]);
          this.carPosition = []
          // this.errorPoints = []
          this.createTime = []
          this.averageTemperature = []
          this.averageHumidity = []
          for(let index in this.temperatures){
            this.temperatures[index] = []
          }
          for(let index in this.humidity){
            this.humidity[index] = []
          }
          for(let state of  res.data){
            let point = []
            this.$set(point,0,state.longitude)
            this.$set(point,1,state.latitude)
            this.carPosition.push(point)
            this.createTime.push(state.createTime.slice(11))
            this.temperatures.temperature1.push(state.temperature1)
            this.temperatures.temperature2.push(state.temperature2)
            this.temperatures.temperature3.push(state.temperature3)
            this.temperatures.temperature4.push(state.temperature4)
            this.temperatures.temperature5.push(state.temperature5)
            this.temperatures.temperature6.push(state.temperature6)
            this.temperatures.temperature7.push(state.temperature7)
            this.averageTemperature.push((state.temperature1*1 + state.temperature2*1 + state.temperature3*1 + state.temperature4*1 + state.temperature5*1 + state.temperature6*1 + state.temperature7*1)/7)
            this.humidity.humidity1.push(state.humidity1)
            this.humidity.humidity2.push(state.humidity2)
            this.humidity.humidity3.push(state.humidity3)
            this.humidity.humidity4.push(state.humidity4)
            this.humidity.humidity5.push(state.humidity5)
            this.humidity.humidity6.push(state.humidity6)
            this.humidity.humidity7.push(state.humidity7)
            this.averageHumidity.push((state.humidity1*1 + state.humidity2*1 + state.humidity3*1 + state.humidity4*1 + state.humidity5*1 + state.humidity6*1 + state.humidity7*1)/7)
          }
          console.log(this.carPosition);
          console.log(this.createTime);
          console.log(this.temperatures);
          console.log(this.humidity);
        })
      },
      getErrorPoints(){
        getErrorOrderData().then(res => {
          this.errorPoints = []
          for(let record in res.data){
            let point = []
            Vue.set(point,0,record.longitude)
            Vue.set(point,1,record.latitude)
            this.errorPoints.push(point)
          }
        }).catch(err => {
          console.log(err);
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
    height: 200px;
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
  /*.driver-info{*/
  /*  width: 33%;*/
  /*  height: 215px;*/
  /*  float: left;*/
  /*  background-color: #fff;*/
  /*  margin-right: 3px;*/
  /*}*/
  /*.goods-info{*/
  /*  width: 33%;*/
  /*  height: 215px;*/
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
</style>