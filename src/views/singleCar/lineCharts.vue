<template>
  <div id="charts">
    <div id="line-charts"></div>
  </div>
</template>

<script>
import echarts from "echarts"
export default {
  name: "lineCharts",
  data(){
    return{
      tempChart:null,
      temp:[3.0,3.5,3.2,2.7,2.9,3.7,3.2],
      humi:[75.0,79.3,72.2,81.6,76.5,80.2,79.9]
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart () {
      this.tempChart = echarts.init(document.getElementById('line-charts'))
      this.tempChart.setOption({
        title: {
          text: "温湿度曲线",
          textStyle:{
            fontSize:14
          }
        },
        tooltip: {
          trigger: 'axis',
        },
        color:['#0000ff','#00ffff'],//图例颜色
        legend: {
          data: [
            {
              name:"平均温度",
              textStyle:{
                color:"#0000ff",//图例文本颜色
              },
            },
            {
              name:"平均湿度",
              textStyle:{
                color:"#00ffff",
              },
            },
          ]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          name:"时间",
          nameTextStyle:{
            fontSize: 12
          },
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color:"#0099ff",
            }
          },
          data: ["0", "0.5", "1", "1.5", "2", "2.5", "3"],
          axisLabel: {
            textStyle: {
              color:"#0099ff",//x轴刻度颜色
              // fontSize: 4
            },
          },
        },
        yAxis: [
          {
            name:"温度（℃）",
            nameTextStyle:{
              color:"#0000ff",
            },
            axisLine:{
              lineStyle:{
                color:"#0000ff",
              }
            },
            axisLabel: {
              textStyle: {
                color:"#0000ff",
              },
            },
            max:10,
            type: "value",
            position:'left'
          },
          {
            name: "湿度（%）",
            nameTextStyle:{
              color:"#00ffff",//y轴文字（湿度）的颜色
            },
            axisLine:{
              lineStyle:{
                color:"#00ffff",
              }
            },
            axisLabel: {
              textStyle: {
                color:"#00ffff",//y轴刻度颜色
              },
            },
            max:100,
            type: "value",
            position:'right'
          }
        ],
        series: [
          {
            name: "平均温度",
            type: "line",
            yAxisIndex:0,
            stack: "总量",
            linestyle:{
              normal:{
                color:"#0000ff",
              },
            },
            data:this.temp
          },
          {
            name: "平均湿度",
            type: "line",
            yAxisIndex:1,
            stack: "总量",
            linestyle:{
              normal:{
                color:"#00ffff",
              },
            },
            data: this.humi
          },
        ]
      })
    }
  }
}
</script>

<style scoped>
  #line-charts{
    width: 400px;
    height: 200px;
    background-color: #fff;
  }
</style>