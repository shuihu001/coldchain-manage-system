<template>
  <div style="height:100%">
    <div class="good-info">
      <table>
        <caption>货物信息</caption>
        <tr>
          <td>订单编号</td>
          <td>{{goodsInfo.id}}</td>
        </tr>
        <tr>
          <td>货物类型</td>
          <td>{{goodsInfo.goodKind}}</td>
        </tr>
        <tr>
          <td>出发地</td>
          <td>{{goodsInfo.starting}}</td>
        </tr>
        <tr>
          <td>目的地</td>
          <td>{{goodsInfo.destination}}</td>
        </tr>
        <tr>
          <td>货物重量</td>
          <td>{{goodsInfo.weight}}吨</td>
        </tr>
        <tr>
          <td>货物数量</td>
          <td>{{goodsInfo.quantity}}头</td>
        </tr>
        <tr>
          <td>开门次数</td>
          <td>{{goodsInfo.countDoor}}</td>
        </tr>
        <tr>
          <td>司机姓名</td>
          <td>{{goodsInfo.driverName}}</td>
        </tr>
        <tr>
          <td>车牌号</td>
          <td>{{goodsInfo.carId}}</td>
        </tr>
        <tr>
          <td>出发时间</td>
          <td>{{goodsInfo.date}}</td>
        </tr>
        <tr>
          <td>设备编号</td>
          <td>{{goodsInfo.deviceId}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodsInfo",
    props:{
      goodsInfo:{
        // type:Object
      }
    },
    created() {
      console.log(this.goodsInfo);
    }
  }
</script>

<style scoped>
  .good-info{
    height: 100%;
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 0 10px;
  }
  table{
    width: 100%;
    height: calc(100% - 48px);
    border-collapse: collapse;
    /* margin: 0 auto; */
  }
  caption{
    width: 100%;
    height: 38px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    line-height: 38px;
  }
  tr{
    width: 100%;
    font-size: 14px;
  }
  tr :first-child{
    font-weight: bold;
    width: 30%;
    text-align: center;
  }
  tr :last-child{
    text-align: start;
    padding-left: 15px;
    width: 70%;
  }
  td{
    /* text-align: center; */
    border: 1px solid #cccccc;
  }
</style>