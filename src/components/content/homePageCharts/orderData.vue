<template>
  <div style="height:100%">
    <div id="orderData">

    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: "orderData",
  props: {
    dateArray: {
      type:Array
    },
    orderNum: {
      type: Array
    },
    errorOrderNum: {
      type: Array
    },
    normalOrder: {
      type: Array
    },
    normalRate: {
      type: Array
    },
    titleText: {
      type:String
    }
  },
  watch: {
    dateArray: {
      handler(val){
        this.drawOrderData()
      },
      deep: true
    },
    orderNum: {
      handler(val){
        this.drawOrderData()
      },
      deep: true
    },
    errorOrderNum: {
      handler(val){
        this.drawOrderData()
      },
      deep: true
    },
    normalOrder: {
      handler(val){
        this.drawOrderData()
      },
      deep: true
    },
    normalRate: {
      handler(val){
        // console.log(val);
        this.drawOrderData()
      },
      deep: true
    }
  },
  mounted () {
    this.drawOrderData()
  },
  methods: {
    drawOrderData() {
      const chartDom = document.getElementById('orderData');
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        title: {
          text: this.titleText+'订单数据',
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
            name: "订单数量",
            textStyle:{
              color: "#fff"
            }
          },
          {
            name: "正常订单",
            textStyle:{
              color: "#fff"
            }
          },
          {
            name: "异常订单",
            textStyle:{
              color: "#fff"
            }
          },
          {
            name: "订单正常率",
            textStyle:{
              color: "#fff"
            }
          }]
        },
        grid: {
          // top:"40px"
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
            name: '数量',
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
            name: '订单正常率(%)',
            nameTextStyle:{
              color:"#fff"
            },
            axisLine:{
              lineStyle:{
                color:"#fff"
              }
            },
            min: 0,
            max: 100
          }
        ],
        series: [
          {
            name: '订单数量',
            type: 'bar',
            data: this.orderNum,
            color: "rgb(111,136,210)" 
          },
          {
            name: '正常订单',
            type: 'bar',
            color: "rgb(145,204,117)",
            stack: "order",
            data: this.normalOrder
          },
          {
            name: '异常订单',
            type: 'bar',
            stack: "order",
            color: "rgb(238,102,102)",
            data: this.errorOrderNum
          },
          {
            name: '订单正常率',
            type: 'line',
            yAxisIndex: 1,
            color: "rgb(28,158,231)",
            data: this.normalRate
          }
        ]
      };
      option && myChart.setOption(option);
    }
  }
}
</script>
<style scoped>
#orderData{
  height: 100%;
  width: 100%;
}
</style>