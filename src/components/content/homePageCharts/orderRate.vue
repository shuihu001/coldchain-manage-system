<template>
  <div style="height:100%">
    <div id="orderRate">

    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: "orderRate",
  props: {
    errorOrderCount: {
      type: Number
    },
    normalOrderCount: {
      type: Number
    },
  },
  watch: {
    errorOrderCount: {
      handler(val){
        this.drawRingChart()
      },
      deep: true
    },
    normalOrderCount: {
      handler(val){
        this.drawRingChart()
      },
      deep: true
    },
  },
  mounted () {
    this.drawRingChart()
  },
  methods: {
    drawRingChart() {
      const chartDom = document.getElementById('orderRate');
      let myChart = echarts.init(chartDom);
      let option;
      option = {
        title: {
          text:"订单数量占比",
          left: "center",
          textStyle: {
            color: "#fff"
          },
          top: "25"
        },
        tooltip: {
          trigger: 'item' 
        },
        series: [
          {
            name: '订单数量',
            type: 'pie',
            color: ["rgb(55,163,218)", "rgb(159,230,184)"],
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}\n{d}%'
            },
            labelLine: {
              show: true
            },
            data: [
              { value: this.errorOrderCount, name: '异常订单',},
              { value: this.normalOrderCount-this.errorOrderCount, name: '正常订单'}
            ]
          }
        ]
      };

      option && myChart.setOption(option);

    }
  },
}
</script>
<style scoped>
#orderRate{
  height: 100%;
  width: 100%;
}
</style>