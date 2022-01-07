<template>
  <div style="height:100%">
    <div id="errorOrderNum">

    </div>
  </div>
</template>
<script>
import Charts from '@jiaminghi/charts'
export default {
  name: "errorOrderNum",
  props: {
    dateArray: {
      type: Array
    },
    errorOrderNumArray: {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  watch: {
    dateArray: {
      handler(val){
        console.log(val)
        this.drawErrorOrderNum()
      },
      deep: true
    },
    errorOrderNumArray: {
      handler(val){
        console.log(val)
        this.drawErrorOrderNum()
      },
      deep: true
    }
  },
  mounted () {
    this.drawErrorOrderNum()
  },
  methods: {
    drawErrorOrderNum () {
      const container = document.getElementById('errorOrderNum')
      if(container.hasChildNodes()){
        container.removeChild(container.firstChild)
      }
      const myChart = new Charts(container)
      myChart.setOption({
        title: {
          text: '异常订单数量',
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
            style:{
              fill: "#fff",
              fontSize: 10
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
            data: this.errorOrderNumArray,
            type: 'line',
            label:{
              show: true
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
#errorOrderNum{
  height: 100%;
  width: 100%;
}
</style>