<template>
  <div class="all-info">
    <div class="car-position">
      <carPosition></carPosition>
    </div>
    <div class="all-sensor">
      <allSensors></allSensors>
    </div>
    <div class="line-charts">
      <lineCharts></lineCharts>
    </div>
    <div class="driver-info">
      <driverInfo></driverInfo>
    </div>
    <div class="goods-info">
      <goodsInfo></goodsInfo>
    </div>
    <div class="goods-video">
      <goodsVideo></goodsVideo>
    </div>
  </div>
</template>

<script>
import carPosition from "./carPosition";
import allSensors from "./allSensors";
import lineCharts from "./lineCharts";
import driverInfo from "./driverInfo";
import goodsInfo from "./goodsInfo";
import goodsVideo from "./goodsVideo";
export default {
  name:'singleCar',
  components:{
    carPosition,
    allSensors,
    lineCharts,
    driverInfo,
    goodsInfo,
    goodsVideo
  }
}
</script>

<style scoped>
  .all-info{
    width: 100%;
    height: 100%;
    /*background-color: pink;*/
  }
  .car-position{
    width: 840px;
    height: 410px;
    margin-bottom: 10px;
    float: left;
  }
  .all-sensor,.line-charts{
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
