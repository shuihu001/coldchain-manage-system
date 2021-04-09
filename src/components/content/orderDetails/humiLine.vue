<template>
  <div id="humi-line" ref="humidity">

  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "humiLine",
    props:{
      humidity:{
        type:Object,
        default(){
          return {}
        }
      },
      createTime:{
        type:Array,
      }
    },
    data(){
      return{
        // humiData:[]
      }
    },
    watch:{
      // humidity(newValue){
      //   console.log(this.humidity);
      //   console.log(newValue);
      //   console.log("湿度变了");
      //   this.drawLine()
      // },
      createTime(){
        console.log("时间变了");
        this.drawLine()
      }
    },
    mounted() {
      setTimeout(()=>{
        this.drawLine()
      },500)

    },
    methods:{
      drawLine(){
        // let chartDom = document.getElementById('humi-line');
        let chartDom = this.$refs.humidity;
        let myChart = echarts.init(chartDom);
        let option;
        option = {
          //设置grid是设置图表与父元素div块之间边界，让图标尽可能占满整个div块
          grid:{
            top:"40px",
            bottom:"30px",
            left:"40px",
            right:"45px"
          },
          xAxis: {
            name:"时间",
            type: 'category',
            // data:['13:25:20','13:30:20','13:35:20','13:40:20','13:45:20','13:50:20','13:55:20','14:00:20','14:05:20','14:10:20','14:15:20','14:20:20','14:25:20']
            data:this.createTime
          },
          yAxis: {
            name:"湿度（%）",
            type: 'value',
            //设置y轴刻度的最值

            // min:65,
            // max:90
          },
          series: [{
            // data: [85,79,80,83,82,70,75,79,76,80,82,83,79,83],
            data: this.humidity.humidity1,
            type: 'line'
          },{
            data: this.humidity.humidity2,
            type: 'line'
          },{
            data: this.humidity.humidity3,
            type: 'line'
          },{
            data: this.humidity.humidity4,
            type: 'line'
          },{
            data: this.humidity.humidity5,
            type: 'line'
          },{
            data: this.humidity.humidity6,
            type: 'line'
          },{
            data: this.humidity.humidity7,
            type: 'line'
          },
          ]
        };
        option && myChart.setOption(option);
      }
    },

  }
</script>

<style scoped>
  #humi-line{
    width: 400px;
    height: 200px;
    background-color: #fff;
  }
</style>