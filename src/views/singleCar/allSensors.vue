<template>
  <div class="sensors">
    <div class="temperature">
      <table>
        <caption>温度&nbsp;&nbsp;℃</caption>
        <th>序号</th>
        <th>值</th>
        <tr v-for="(temp,index) in temp">
          <td>{{ index+1 }}</td>
          <td>{{ temp }}</td>
        </tr>
      </table>
    </div>
    <div class="humidity">
      <table>
        <caption>湿度&nbsp;&nbsp;%</caption>
        <th>序号</th>
        <th>值</th>
        <tr v-for="(humi,index) in humi">
          <td>{{ index+1 }}</td>
          <td>{{ humi }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "allSensors",
  data(){
    return{
      temp:[3.0,3.5,3.2,2.7,2.9,3.7,3.2],
      humi:[75.0,79.3,72.2,81.6,76.5,80.2,79.9]
    }
  }
}
</script>

<style scoped>
  .sensors{
    width: 100%;
    height: 200px;
  }
  .temperature{
    width: 195px;
    height: 100%;
    margin-right: 10px;
    float: left;
    background-color: #fff;
  }
  .humidity{
    width: 195px;
    height: 100%;
    float: left;
    background-color: #fff;
  }
  table{
    width: 180px;
    border: 1px solid black;
    border-collapse: collapse;
    margin:0 auto
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