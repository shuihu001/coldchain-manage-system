<template>
  <div style="height:100%">
    <div id="goodQuantity">

    </div>
  </div>
</template>
<script>
import Charts from '@jiaminghi/charts'
export default {
  name: "goodQuantity",
  props: {
    dateArray: {
      type: Array
    },
    goodQuantityArray: {
      type: Array
    }
  },
  watch: {
    dateArray: {
      handler(val){
        console.log(val)
        this.drawGoodQuantity()
      },
      deep: true
    },
    goodQuantityArray: {
      handler(val){
        console.log(val)
        this.drawGoodQuantity()
      },
      deep: true
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.drawGoodQuantity()
  },
  methods: {
    drawGoodQuantity () {
      const container = document.getElementById('goodQuantity')
      if(container.hasChildNodes()){
        container.removeChild(container.firstChild)
      }
      const myChart = new Charts(container)
      myChart.setOption({
        title: {
          text: '货物数量',
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
          name: '数量（头）',
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
            data: this.goodQuantityArray,
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
#goodQuantity{
  height: 100%;
  width: 100%;
}
</style>