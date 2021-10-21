<template>
  <div id="temp-line" ref="temperature">

  </div>
</template>

<script>
  import * as echarts  from "echarts"
  import bus from "../../common/bus";
  export default {
    name: "tempLine",
    props:{
      temperature:{
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
      return {
        // tempData:[]
        collapse:'',
        myChart:''
      }
    },
    created() {
      bus.$on('collapse',(val) => this.collapse = !val)
    },
    watch:{
      // collapse(){
      //   this.myChart.resize()
      // },
      temperature(){
        console.log("温度变了");
        this.drawLine(this.createTime,this.temperature)
      },
      createTime(){
        // console.log("时间变了");
        this.drawLine(this.createTime,this.temperature)
      }
    },
    mounted() {
      setTimeout(() => {
        this.drawLine(this.createTime,this.temperature)
      },500)
    },
    methods:{
      drawLine(createTime,temperature){
        // let chartDom = document.getElementById('temp-line');
        let chartDom = this.$refs.temperature;
        this.myChart = echarts.init(chartDom);
        let option;
        option = {
          //设置grid是设置图表与父元素div块之间边界，让图标尽可能占满整个div块
          grid:{
            top:"40px",
            bottom:"35px",
            left:"40px",
            right:"45px"
          },
          legend: {
            data: ['设备1', '设备2', '设备3', '设备4', '设备5', '设备6']
          },
          xAxis: {
            name:"时间",
            type: 'category',
            // data:['13:25:20','13:30:20','13:35:20','13:40:20','13:45:20','13:50:20','13:55:20','14:00:20','14:05:20','14:10:20','14:15:20','14:20:20','14:25:20']
            data:createTime.map(time => { return time.replace("T","\n")})
          },
          yAxis: {
            name:"温度（°C）",
            type: 'value'
          },
          series: [{
            // data: [2,2.5,1.9,1.8,0.6,3.2,3.6,-2,-1.4,1.6,2.0,4.5,0.3,2.0],
            data: temperature.temperature1,
            type: 'line',
            name: '设备1'
          },{
            data: temperature.temperature2,
            type: 'line',
            name: '设备2'
          },{
            data: temperature.temperature3,
            type: 'line',
            name: '设备3'
          },{
            data: temperature.temperature4,
            type: 'line',
            name: '设备4'
          },{
            data: temperature.temperature5,
            type: 'line',
            name: '设备5'
          },{
            data: temperature.temperature6,
            type: 'line',
            name: '设备6'
          },{
            data: temperature.temperature7,
            type: 'line',
            name: '设备1'
          }
          ]
        };
        option && this.myChart.setOption(option);
      },
    },
  }
</script>

<style scoped>
  #temp-line{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>