<!--  -->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="9">
        <el-card shadow="hover" class="mgb20" style="height:470px;">
          <schart ref="ring" class="schartpie" canvasId="ring" :options="options1"></schart>
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card shadow="hover" id="container" class="mgb20" style="height:470px;">
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <div id="stack"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <schart ref="line" class="schart" canvasId="line" :options="options3"></schart>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import echarts from 'echarts'
import Schart from 'vue-schart';
import AMap from 'AMap'
import {errData, fetchData} from '../api/index'
import Vue from 'vue'

export default {
  name: 'homepage',
  data() {
    return {
      pos: [],
      temp: [],
      errSum: [0,0,0],
      normalSum: 0,
      errDays: [0,0,0,0,0,0,0],
      normalDays: [0,0,0,0,0,0,0],
      errMonths: [0,0,0,0,0,0],
      normalMonths:[0,0,0,0,0,0],
      siteInfo:[
        [{keyword:'河北省图书馆', city:'石家庄'},{keyword:'大兴机场', city:'北京'}],
        [{keyword: '内蒙古博物馆',city: '呼和浩特'},{keyword:'八达岭奥特莱斯',city:'北京'}],
        [{keyword: '哈尔滨市政府',city: '哈尔滨'},{keyword:'北京物资学院',city:'北京'}],
        [{keyword: '龙门石窟',city: '洛阳'},{keyword:'北京邮电大学',city:'北京'}],
      ],
      options1: {
        type: 'ring',
        title: {
          text: '异常订单数量和种类占比'
        },
        labels: ['温度异常','湿度异常','开关门异常'],
        datasets: [{
            data: [],
          }]
      },
      options2: {
        title: {
          text: '近7日订单数量统计',
          x: 'center',
          textStyle: {
            color: '#666',
          },
        },
        color: ["#4a90e2", '#f5a623'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          top: '10%',
          data: ['正常订单', '异常订单'],
          textStyle: {
            fontSize: '12'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisLabel: {
              textStyle: {
                fontSize: '12'
              }
            },
            axisTick :{
              show: false,
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick :{
              show: false,
            },
            axisLabel: {
              textStyle: {
                fontSize: '12'
              }
            },
          }
        ],
        series: [
          {
            name: '正常订单',
            type: 'bar',
            stack: '数量',
            data: [],
            barWidth: 30
          },
          {
            name: '异常订单',
            type: 'bar',
            stack: '数量',
            data: [],
            barWidth: 30
          }
        ]
      },
      options3: {
        type: 'line',
        title: {
          text: '近6月订单数量统计'
        },
        labels: [],
        datasets: [
          {
            label: '正常订单',
            data: []
          },
          {
            label: '异常订单',
            data: []
          }
        ]
      }
    }
  },
  components: {
    Schart
  },
  created() {
    this.getXlable();
    this.getData();
    // console.log(this.pos);
  },
  methods: {
    getXlable() {
      //7days
      for (let j = 0; j < 7 ; j++) {
        this.options2.xAxis[0].data[j] = this.addDays(j-6).cdate;
      }
      //6months
      for (let i = 0; i < 6; i++) {
        this.options3.labels[i] = this.addMonths(i-5).cmonth;
      }
    },

    getData() {
      //map
      fetchData(5).then(res => {
        console.log(res);
        for (let n = 0; n < res.data.length; n++) {
          Vue.set(this.pos,n, res.data[n].pos);
          console.log(this.pos);
        }
      })
      fetchData(5).then(res => {
        console.log(res.data);
        this.temp = res.data;
        for (let m = 0; m < this.temp.length; m++) {
          let yt1 = new Date(this.temp[m].updateTime).getFullYear();
          let mt1 = (new Date(this.temp[m].updateTime).getMonth())+1;
          let dt1 = new Date(this.temp[m].updateTime).getDate();
          if (this.temp[m].alert == 0){
            this.normalSum += 1;
            for (let i = 0; i < 6; i++) {
              let yt2 = this.addMonths(i-5).year;
              let mt2 = this.addMonths(i-5).mmonth;
              if(yt1 == yt2 && mt1 == mt2 ){
                this.normalMonths[i] += 1;
              }
            }
            for (let j = 0; j < 7; j++) {
              let yyt2 = this.addDays(j-6).y;
              let mmt2 = this.addDays(j-6).mm;
              let ddt2 = this.addDays(j-6).dd;
              if(yt1 == yyt2 && mt1 == mmt2 && dt1 == ddt2){
                this.normalDays[j] += 1;
              }
            }
          }else{
            for (let i = 0; i < 6; i++) {
              let yt2 = this.addMonths(i-5).year;
              let mt2 = this.addMonths(i-5).mmonth;
              if(yt1 == yt2 && mt1 == mt2 ){
                this.errMonths[i] += 1;
              }
            }
            for (let j = 0; j < 7; j++) {
              let yyt2 = this.addDays(j-6).y;
              let mmt2 = this.addDays(j-6).mm;
              let ddt2 = this.addDays(j-6).dd;
              if(yt1 == yyt2 && mt1 == mmt2 && dt1 == ddt2){
                this.errDays[j] += 1;
              }
            }
            if (this.temp[m].alert == 1){
              this.errSum[0] += 1;
            }else if (this.temp[m].alert == 2){
              this.errSum[1] += 1;
            }else if (this.temp[m].alert == 3){
              this.errSum[2] += 1;
            }
          }
        }
        this.options1.datasets[0].data = this.errSum;
        this.options2.series[0].data = this.normalDays;
        this.options2.series[1].data = this.errDays;
        this.options3.datasets[0].data = this.normalMonths;
        this.options3.datasets[1].data = this.errMonths;
        console.log(this.options2.series[0].data);
        console.log(this.options2.series[1].data);
      })
    },

    addMonths(monthNum) {
      let nm = new Date();
      let year = nm.getFullYear();
      let month = nm.getMonth()+1;
      month = month + monthNum;
      if (month > 12) {
        while (month > 12) {
          year++;
          month -= 12;
        }} else if (month <= 0) {
        while (month <= 0) {
          year--;
          month += 12;
        }}
      let mmonth = month;
      month = month < 10 ? "0" + month : month;
      let cmonth = year + "-" + month;
      return {cmonth,year,mmonth};
    },

    addDays(days){
      let nd = new Date();
      nd = nd.valueOf();
      nd = nd + days * 24 * 60 * 60 * 1000;
      nd = new Date(nd);
      let y = nd.getFullYear();
      let m = nd.getMonth()+1;
      let d = nd.getDate();
      let mm = m;
      let dd = d;
      if(m <= 9) m = "0"+m;
      if(d <= 9) d = "0"+d;
      let cdate = m +"-"+d;
      return {cdate,y,mm,dd};
    },
    drawMap() {
      const mapDemo = new AMap.Map('container');
      // let icon = new AMap.Icon({
      //   image: require('../assets/img/mark.png'),//自定义icon
      //   size: new AMap.Size(25, 25)//icon的大小
      // });
      mapDemo.setMapStyle('amap://styles/normal');
      for (let p = 0; p < this.pos.length; p++) {
        let marker = new AMap.Marker({ //点图标
          position: this.pos[p],
          // icon:icon
        });
        mapDemo.add(marker)
        const twoPoint = this.siteInfo[p]
        mapDemo.plugin('AMap.Driving', function () {
          const driving = new AMap.Driving({
            policy: AMap.DrivingPolicy.LEAST_TIME,
            map: mapDemo
          })
          driving.search(twoPoint, function (status, result) {
            if (status === 'complete') {
              console.log('绘制驾车路线完成');
            } else {
              console.log('绘制驾车路线失败' + result)
            }
            mapDemo.addControl(driving)
          })
        })
      }
      AMap.convertFrom(this.pos[0],'gps',function (status,result) {
        if(result.info === 'ok'){
          const newMarker = new AMap.Marker({
            position:[result.locations[0].R,result.locations[0].Q]
          })
          mapDemo.add(newMarker)
          console.log(result.locations[0])
        }
      })
    },
    drawLine() {
      this.myStack = echarts.init(document.getElementById('stack'))
      this.myStack.setOption(this.options2);
    }
  },
  mounted() {
    setTimeout(() =>{
      this.drawLine()
      this.drawMap()
    },500)
    // this.drawLine()

  }
};

</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.el-row {
  margin-bottom: 5px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.schart {
  width: 100%;
  height: 300px;
}
.schartpie {
  width: 100%;
  height: 500px;
}
#container{
  width: 100%;
  height: 100%;
}
#stack{
  width: 100%;
  height: 300px;
}
</style>