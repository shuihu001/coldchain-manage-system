<template>
  <div style="height:100%">
    <div id="orderNum" ref="orderNum">

    </div>
  </div>
</template>
<script>
import Charts from '@jiaminghi/charts'
import echarts from 'echarts'
export default {
  name: "orderNum",
  props: {
    dateArray: {
      type: Array
    },
    orderNumArray: {
      type: Array
    }
  },
  watch: {
    dateArray: {
      handler(val){
        console.log(val)
        this.drawOrderNum()
      },
      deep: true
    },
    orderNumArray: {
      handler(val){
        console.log(val)
        this.drawOrderNum()
      },
      deep: true
    }
  },
  data () {
    return {
      myChart: null
    }
  },
  mounted () {
    this.drawOrderNum()
  },
  methods: {
    drawOrderNum () {
      // const container = document.getElementById('orderNum')
      // if(container.hasChildNodes()){
      //   container.removeChild(container.firstChild)
      // }
      // const myChart = new Charts(container)

      let chartDom = this.$refs.orderNum;
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        title: {
          text: '订单数量',
          style: {
            fill: '#fff',
            fontSize: 17,
            fontWeight: 'bold',
          }
        },
        grid: {
          left: 40,
          right: 60,
          bottom: 30,
          top: 55
        },
        xAxis: {
          name: '日期',
          data: this.dateArray,
          splitNumber: 3,
          nameTextStyle: {
            fill: "#fff",
            fontSize: 12
          },
          axisLine: {
            style:{
              opacity: 1
            }
          },
          axisLabel: {
            // formatter: date => {date.replace("-","/")},
            style:{
              fill: "#fff",
              fontSize: 10,
              rotate: 315
            }
          },
        },
        yAxis: {
          name: '数量',
          data: 'value',
          min: 0,
          nameTextStyle: {
            fill: "#fff",
            fontSize: 12
          },
          axisLine: {
            style:{
              opacity: 0.5
            }
          },
          axisLabel: {
            style:{
              fill: "#fff",
              fontSize: 10
            }
          },
          splitLine: {
            show: true,
            style: {
              color: "#fff",
              opacity: 0.1
            }
          },
        },
        series: [
          {
            data: this.orderNumArray,
            type: 'line',
            // yAxisIndex: 1
            label:{
              show: true
            }
          }
        ]
      }
      option && myChart.setOption(option);
      // myChart.setOption({
      //   title: {
      //     text: '订单数量',
      //     style: {
      //       fill: '#fff',
      //       fontSize: 17,
      //       fontWeight: 'bold',
      //     }
      //   },
      //   grid: {
      //     left: 40,
      //     right: 60,
      //     bottom: 30,
      //     top: 55
      //   },
      //   xAxis: {
      //     name: '日期',
      //     data: this.dateArray,
      //     splitNumber: 3,
      //     nameTextStyle: {
      //       fill: "#fff",
      //       fontSize: 12
      //     },
      //     axisLine: {
      //       style:{
      //         opacity: 1
      //       }
      //     },
      //     axisLabel: {
      //       // formatter: date => {date.replace("-","/")},
      //       style:{
      //         fill: "#fff",
      //         fontSize: 10,
      //         rotate: 315
      //       }
      //     },
      //   },
      //   yAxis: {
      //     name: '数量',
      //     data: 'value',
      //     min: 0,
      //     nameTextStyle: {
      //       fill: "#fff",
      //       fontSize: 12
      //     },
      //     axisLine: {
      //       style:{
      //         opacity: 0.5
      //       }
      //     },
      //     axisLabel: {
      //       style:{
      //         fill: "#fff",
      //         fontSize: 10
      //       }
      //     },
      //     splitLine: {
      //       show: true,
      //       style: {
      //         color: "#fff",
      //         opacity: 0.1
      //       }
      //     },
      //   },
      //   series: [
      //     {
      //       data: this.orderNumArray,
      //       type: 'line',
      //       // yAxisIndex: 1
      //       label:{
      //         show: true
      //       }
      //     }
      //   ]
      // },false)
    },
  }
}
</script>
<style scoped>
#orderNum{
  height: 100%;
  width: 100%;
}
</style>