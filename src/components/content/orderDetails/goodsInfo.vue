<template>
  <div>
    <div class="driver-info">
      <table>
        <caption>货物信息</caption>
        <tr>
          <td>订单编号</td>
          <td>{{this.goodsInfo.id}}</td>
        </tr>
        <tr>
          <td>货物类型</td>
          <td>{{this.goodsInfo.goodKind}}</td>
        </tr>
        <tr>
          <td>出发地</td>
          <td>{{this.goodsInfo.starting}}</td>
        </tr>
        <tr>
          <td>目的地</td>
          <td>{{this.goodsInfo.destination}}</td>
        </tr>
        <tr>
          <td>设备编号</td>
          <td>{{this.goodsInfo.deviceId}}</td>
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
    data(){
      return{
        // goodsInfo: {
        //   goodKind:'黑猪肉',
        //   height:30,
        //   creatorId:'-2~5',
        //   deviceId:'70~80',
        //   createTime:'2020-11-29 12:21:21',
        //   starting:'河北省石家庄',
        //   destination:'北京市昌平区',
        // }
      }
    }
  }
</script>

<style scoped>
  table{
    width: 380px;
    height: 100%;
    border-collapse: collapse;
    margin: 0 auto;
  }
  caption{
    width: 100%;
    height: 38px;
    text-align: center;
    line-height: 38px;
  }
  tr{
    width: 100%;
    height: 21px;
  }
  th,td{
    width: 150px;
    height: 100%;
    text-align: center;
    border: 1px solid #cccccc;
  }
</style>