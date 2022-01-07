<template>
  <div style="height:100%">
    <div id="goodData">

    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: "goodData",
  props: {
    dateArray: {
      type:Array
    },
    goodWeightArray: {
      type: Array
    },
    goodQuantityArray: {
      type: Array
    },
    titleText: {
      type:String
    }
  },
  watch: {
    goodWeightArray: {
      handler(val){
        console.log(JSON.parse(JSON.stringify(val)))
        setTimeout(() => {
          this.drawCharts()
        },100)
      }
    },
  },
  mounted () {
    this.drawCharts()
  },
  methods: {
    drawCharts () {
      const chartDom = document.getElementById('goodData');
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        title: {
          text: this.titleText+'货物数据',
          textAlign: "center",
          left: "50%",
          top: "20",
          textStyle: {
            color:"#fff",
            fontSize:"14",
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        legend: {
          bottom: 10,
          data: [{
            name: "数量",
            textStyle:{
              color: "#fff"
            }},{
              name: "重量",
              textStyle:{
                color: "#fff"
              }
            }]
        },
        xAxis: [
          {
            type: 'category',
            data: this.dateArray,
            axisTick: {
              show: false
            },
            axisPointer: {
              type: 'shadow'
            },
            nameTextStyle:{
              color:"#fff"
            },
            axisLine:{
              lineStyle:{
                color:"#fff"
              }
            },
          }
        ],
        yAxis: [
          {
            splitLine: { show: false },
            type: 'value',
            name: '数量（头）',
            nameTextStyle:{
              color:"#fff"
            },
            axisLine:{
              lineStyle:{
                color:"#fff"
              }
            },
            min: 0,
          },
          {
            splitLine: { show: false },
            type: 'value',
            name: '重量（吨）',
            nameTextStyle:{
              color:"#fff"
            },
            axisLine:{
              lineStyle:{
                color:"#fff"
              }
            },
            min: 0,
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            data: this.goodQuantityArray,
            color: "rgb(107,76,150)"
          },
          {
            name: '重量',
            type: 'line',
            yAxisIndex: 1,
            color: "rgb(240,47,194)",
            data: this.goodWeightArray
          }
        ]
      };
      option && myChart.setOption(option);
      console.log("执行了");
    }
  }
}
</script>
<style scoped>
#goodData{
  height: 100%;
  width: 100%;
}
</style>
  
</style>