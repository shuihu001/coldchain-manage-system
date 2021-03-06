<template>
  <div>
    <div class="driver-info">
      <table>
        <caption>货物信息</caption>
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
          '货物类型':'黑猪肉',
          '重量(kg)':30,
          '推荐温度℃':'-2~5',
          '推荐湿度%':'70~80',
          '上车时间':'2020-11-29 12:21:21',
          '始发地':'河北省石家庄',
          '目的地':'北京市昌平区',
        }
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