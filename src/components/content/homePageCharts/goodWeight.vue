<template>
  <div style="height:100%">
    <div id="goodWeight">

    </div>
  </div>
</template>
<script>
import Charts from '@jiaminghi/charts'
export default {
  name: "goodWeight",
  props: {
    dateArray: {
      type: Array
    },
    goodWeightArray: {
      type: Array
    }
  },
  watch: {
    dateArray: {
      handler(val){
        console.log(val)
        this.drawGoodWeight()
      },
      deep: true
    },
    goodWeightArray: {
      handler(val){
        console.log(val)
        this.drawGoodWeight()
      },
      deep: true
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.drawGoodWeight()
  },
  methods: {
    drawGoodWeight () {
      const container = document.getElementById('goodWeight')
      if(container.hasChildNodes()){
        container.removeChild(container.firstChild)
      }
      const myChart = new Charts(container)
      myChart.setOption({
        title: {
          text: '货物重量',
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
          name: '重量（吨）',
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
            data: this.goodWeightArray,
            type: 'bar',
            label:{
              show: true
            },
            gradient: {
              // color: ["rgba(156,107,211,0.2)", "rgba(156,107,211,0.6)"]
              color: ["#956FD4", "#3EACE5"]
              
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
#goodWeight{
  height: 100%;
  width: 100%;
}
</style>