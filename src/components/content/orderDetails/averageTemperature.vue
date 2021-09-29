<template>
  <div id="average-temperature" ref="averTemperature">

  </div>
</template>

<script>
  import * as echarts  from "echarts"
  export default {
    name: "averageTemperature",
    props:{
      averageTemperature:{
        type:Array,
        default(){
          return []
        }
      },
      createTime:{
        type:Array,
      }
    },
    mounted() {
      setTimeout(() => {
        this.drawAverageTemperatureLine(this.createTime,this.averageTemperature)
      })
    },
    watch:{
      createTime(){
        this.drawAverageTemperatureLine(this.createTime,this.averageTemperature)
      }
    },
    methods:{
      drawAverageTemperatureLine(createTime,averageTemperature){
        let chartDom = this.$refs.averTemperature;
        let myChart = echarts.init(chartDom);
        let option;
        option = {
          color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
          title: {
            text: '平均温度曲线'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: 'Line 1'
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          grid: {
            left: '3%',
            right: '7%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              name:"时间",
              type: 'category',
              boundaryGap: false,
              data: createTime.map(time => { return time.replace("T","\n")})
            }
          ],
          yAxis: [
            {
              name:"温度（°C）",
              type: 'value',
              // min:12,
              // max:16,
            }
          ],
          series: [
            {
              name: 'Line 1',
              type: 'line',
              stack: '总量',
              smooth: true,
              lineStyle: {
                width: 0
              },
              showSymbol: false,
              areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(128, 255, 165)'
                }, {
                  offset: 1,
                  color: 'rgba(1, 191, 236)'
                }])
              },
              emphasis: {
                focus: 'series'
              },
              data: averageTemperature
            },
          ]
        };
        option && myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  #average-temperature{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>