<!--  -->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:470px;">
          <schart ref="ring" class="schartpie" canvasId="ring" :options="options1"></schart>
        </el-card>
      </el-col>
      <el-col :span="16">
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
import { fetchData } from '../api/index'
import Vue from 'vue'

export default {
  name: 'homepage',
  data() {
    return {
      pos: [],
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
        labels: ['开关门异常', '温湿度异常'],
        datasets: [
          {
            data: [234, 27]
          }
        ]
      },
      options2: {
        type: 'bar',
        title: {
          text: '近7日订单数量统计'
        },
        xRorate: 25,
        labels: ['3.06', '3.07', '3.08', '3.09', '3.10', '3.11', '3.12'],
        datasets: [
          {
            label: '正常订单',
            data: [234, 278, 270, 190, 230, 112, 113]
          },
          {
            label: '异常订单',
            data: [44, 84, 40, 45, 40, 14, 42]
          }
        ]
      },
      options3: {
        type: 'line',
        title: {
          text: '近6月订单数量统计'
        },
        labels: ['9月', '10月', '11月', '12月', '1月', '2月'],
        datasets: [
          {
            label: '正常订单',
            data: [234, 278, 270, 190, 230, 190]
          },
          {
            label: '异常订单',
            data: [164, 178, 150, 135, 160, 150]
          }
        ]
      }
    }
  },
  components: {
    Schart
  },
  created() {
    this.getData();
    console.log(this.pos);
  },
  methods: {
    // 获取 easy-mock 的模拟数据
    getData() {
      fetchData().then(res => {
        console.log(res.list2[0].pos);
        for (let n = 0; n < res.list2.length; n++) {
          Vue.set(this.pos,n, res.list2[n].pos);
          console.log(this.pos);
        }
      }).catch(err =>{
        console.log(err);
      });
    },
    changeDate() {
      const now = new Date().getTime();
      this.data.forEach((item, index) => {
        const date = new Date(now - (6 - index) * 86400000);
        item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      });
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
      this.myStack.setOption({
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
            data: ['3/10', '3/11', '3/12', '3/13', '3/14', '3/15', '3/16'],
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
            data: [220, 182, 191, 234, 290, 123, 456],
            barWidth: 30
          },
          {
            name: '异常订单',
            type: 'bar',
            stack: '数量',
            data: [12, 13, 1, 34, 9, 10, 12],
            barWidth: 30
          },
        ]

      });
    }
    // handleListener() {
    //     bus.$on('collapse', this.handleBus);
    //     // 调用renderChart方法对图表进行重新渲染
    //     window.addEventListener('resize', this.renderChart);
    // },
    // handleBus(msg) {
    //     setTimeout(() => {
    //         this.renderChart();
    //     }, 200);
    // },
    // renderChart() {
    //     this.$refs.bar.renderChart();
    //     this.$refs.line.renderChart();
    // }
  },
  mounted() {
    setTimeout(() =>{
      this.drawMap()
    },500)
    // this.drawMap()
    this.drawLine()

  }
};

// export default {
// //import引入的组件需要注入到对象中才能使用
// components: {},
// data() {
// //这里存放数据
// return {
//
// };
// },
// //监听属性 类似于data概念
// computed: {},
// //监控data中的数据变化
// watch: {},
// //方法集合
// methods: {
//
// },
// //生命周期 - 创建完成（可以访问当前this实例）
// created() {
//
// },
// //生命周期 - 挂载完成（可以访问DOM元素）
// mounted() {
//
// },
// beforeCreate() {}, //生命周期 - 创建之前
// beforeMount() {}, //生命周期 - 挂载之前
// beforeUpdate() {}, //生命周期 - 更新之前
// updated() {}, //生命周期 - 更新之后
// beforeDestroy() {}, //生命周期 - 销毁之前
// destroyed() {}, //生命周期 - 销毁完成
// activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
// }

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