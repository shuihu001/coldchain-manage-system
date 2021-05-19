<template>
  <div id="average-humidity" ref="averHumidity">

  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "averageHumidity",
    props:{
      averageHumidity:{
        type:Array,
        default(){
          return {}
        }
      },
      createTime:{
        type:Array,
      }
    },
    watch:{
      createTime(){
        this.drawAverageHumidityLine(this.createTime,this.averageHumidity)
      }
    },
    mounted() {
      setTimeout(() => {
        this.drawAverageHumidityLine(this.createTime,this.averageHumidity)
      })
    },
    methods:{
      drawAverageHumidityLine(createTime,averageHumidity){
        let chartDom = this.$refs.averHumidity;
        let myChart = echarts.init(chartDom);
        let option;
        option = {
          color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
          title: {
            text: '平均湿度曲线',
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
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: createTime
            }
          ],
          yAxis: [
            {
              name:"湿度（%）",
              type: 'value',
              // min:12,
              // max:16
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
                  // color: 'rgba(128, 255, 165)'
                  color: 'rgba(0, 221, 255)'
                }, {
                  offset: 1,
                  // color: 'rgba(1, 191, 236)'
                  color: 'rgba(77, 119, 255)'
                }])
              },
              emphasis: {
                focus: 'series'
              },
              data: averageHumidity
            },
          ]
        };
        option && myChart.setOption(option);
      }
    }
  }
</script>

<style scoped>
  #average-humidity{
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>