<template>
  <div>
    <div class="driver-info">
      <table>
        <caption>司机信息</caption>
<!--        <th>序号</th>-->
<!--        <th>值</th>-->
        <tr>
          <td>编号</td>
          <td>{{ this.driverInfo.driverId}}</td>
        </tr>
        <tr>
          <td>姓名</td>
          <td>{{ this.driverInfo.name}}</td>
        </tr>
        <tr>
          <td>联系方式</td>
          <td>{{ this.driverInfo.phoneNumber}}</td>
        </tr>
        <tr>
          <td>驾龄</td>
          <td>{{ this.driverInfo.driveYear}}</td>
        </tr>
        <tr>
          <td>驾照等级</td>
          <td>{{ this.driverInfo.driveLicense}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "driverInfo",
  props:{
    driverInfo: {
      type:Object
    }
  },
  data(){
    return{

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
    /*display: flex;*/
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
    /*flex: 1;*/
  }
  th,td{
    width: 150px;
    height: 100%;
    text-align: center;
    border: 1px solid #cccccc;
  }
</style>