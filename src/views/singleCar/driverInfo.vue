<template>
  <div>
    <div class="driver-info">
      <div id="driver-photo">
        <img  alt="">
      </div>
      <table>
        <caption>司机信息</caption>
        <th>序号</th>
        <th>值</th>
        <tr v-for="(key,value) in driverInfo">
          <td>{{ value }}</td>
          <td>{{key}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "driverInfo",
  data(){
    return{
      driverInfo: {
        '姓名':'张三',
        '驾龄':3,
        '驾照等级':'A1',
      },

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