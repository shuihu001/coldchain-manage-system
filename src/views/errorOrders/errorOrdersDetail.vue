<template>
  <div class="all-info">
    <div class="car-position">
      <car-track :points = "carPosition" :errorPoints = "errorPoints"></car-track>
    </div>
    <div class="temp-line">
      <tempLine :temperature = "temperatures" :create-time = "createTime"></tempLine>
    </div>
    <div class="humi-line">
      <humi-Line :humidity = "humidity" :create-time = "createTime"></humi-Line>
    </div>
    <div class="driver-info">
      <driverInfo :driver-info = "driverData"></driverInfo>
    </div>
    <div class="goods-info">
      <goodsInfo :goods-info = "orderData"></goodsInfo>
    </div>
    <div class="goods-video">
      <good-video :video-url = "orderData.videoHttpBack"></good-video>
    </div>
  </div>
</template>

<script>
  import carPosition from "components/content/orderDetails/carPosition";
  import carTrack from "../../components/content/orderDetails/carTrack";
  import allSensors from "components/content/orderDetails/allSensors";
  import tempLine from "components/content/orderDetails/tempLine";
  import humiLine from "../../components/content/orderDetails/humiLine";
  import driverInfo from "components/content/orderDetails/driverInfo";
  import goodsInfo from "components/content/orderDetails/goodsInfo";
  import goodVideo from "../../components/content/orderDetails/goodVideo";

  import {getDriver, getCarState, getErrorOrderData} from "../../network/requestDatas";

  export default {
    name: "errorOrdersDetails",
    components:{
      carPosition,
      carTrack,
      allSensors,
      tempLine,
      humiLine,
      driverInfo,
      goodsInfo,
      goodVideo
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
        humidity:{
          humidity1:[],
          humidity2:[],
          humidity3:[],
          humidity4:[],
          humidity5:[],
          humidity6:[],
          humidity7:[],
        },
      }
    },
    created() {
      this.orderData = this.$route.query.order

    },
    mounted() {
      this.getDriverInfo()
      this.getCarStateData(this.orderData.id)
      this.getErrorPoints()
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
        getCarState(orderId).then( res => {
          for(let state in res.data){
            let point = []
            Vue.set(point,0,state.longitude)
            Vue.set(point,1,state.latitude)
            this.carPosition.push(point)
            this.createTime.push(state.createTime)
            this.temperatures.temperature1.push(state.temperature1)
            this.temperatures.temperature2.push(state.temperature2)
            this.temperatures.temperature3.push(state.temperature3)
            this.temperatures.temperature4.push(state.temperature4)
            this.temperatures.temperature5.push(state.temperature5)
            this.temperatures.temperature6.push(state.temperature6)
            this.temperatures.temperature7.push(state.temperature7)
            this.humidity.humidity1.push(state.humidity1)
            this.humidity.humidity2.push(state.humidity2)
            this.humidity.humidity3.push(state.humidity3)
            this.humidity.humidity4.push(state.humidity4)
            this.humidity.humidity5.push(state.humidity5)
            this.humidity.humidity6.push(state.humidity6)
            this.humidity.humidity7.push(state.humidity7)
          }
        })
      },
      getErrorPoints(){
        getErrorOrderData().then(res => {
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
    width: 840px;
    height: 410px;
    margin-bottom: 10px;
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
    height: 215px;
    float: left;
    background-color: #fff;
    margin-right: 10px;
  }
  .goods-info{
    width: 415px;
    height: 215px;
    background-color: #fff;
    float: left;
  }
  .goods-video{
    width: 400px;
    height: 215px;
    background-color: #fff;
    float: right;
  }
</style>