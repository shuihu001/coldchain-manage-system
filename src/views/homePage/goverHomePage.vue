<template>
  <div class="all-container">
    <dv-border-box-11 title="猪肉进京冷链运输监控系统" :titleWidth="300">
      <div class="all-content">
        <div class="content-top">
          <div class="company-data">
            <dv-border-box-13>
              <companyOrderData :everyCompanyData="everyCompanyDataArr" />
            </dv-border-box-13>
          </div>
          <div class="statistic-data">
            <dv-border-box-10>
              <div class="center-content">
                <div class="selection">
                  <el-select v-model="selectedDuration" @change="handleSelectedDurationChanged" filterable placeholder="请选择时间">
                    <el-option
                      v-for="item in durationOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="data">
                  <div class="top-data">
                    <dv-border-box-12>
                    <div class="top-data-content">
                      <p>已完成订单数量</p>
                      <p>{{ processedOrderCount }}</p>
                    </div>
                    </dv-border-box-12>
                    <dv-border-box-12>
                      <div class="top-data-content">
                        <p>已完成货物数量</p>
                        <p>{{ processedQuantityCount }}头</p>
                      </div>
                    </dv-border-box-12>
                    <dv-border-box-12>
                      <div class="top-data-content">
                        <p>已完成货物重量</p>
                        <p>{{ processedWeightCount }}吨</p>
                      </div>
                    </dv-border-box-12>
                  </div>
                  <div class="center-data">
                    <dv-border-box-12>
                      <div class="top-data-content">
                        <p>昨日新增订单数量</p>
                        <p>{{ yesterdayOrderCount }}</p>
                      </div>
                    </dv-border-box-12>
                    <dv-border-box-12>
                      <div class="top-data-content">
                        <p>昨日新增货物数量</p>
                        <p>{{ yesterdayQuantityCount }}头</p>
                      </div>
                    </dv-border-box-12>
                    <dv-border-box-12>
                      <div class="top-data-content">
                        <p>昨日新增货物重量</p>
                        <p>{{ yesterdayWeightCount }}吨</p>
                      </div>
                    </dv-border-box-12>
                  </div>
                  <div class="bottom-data">
                    <dv-border-box-12>
                      <div class="top-data-content">
                        <p>异常订单数量</p>
                        <p>{{ errorOrderCount }}</p>
                      </div>
                    </dv-border-box-12>
                    <dv-border-box-12>
                      <div class="top-data-content">
                        <p>运行中订单数量</p>
                        <p>{{ processingOrderCount }}</p>
                      </div>
                    </dv-border-box-12>
                  </div>
                </div>
              </div>
            </dv-border-box-10>
          </div>
          <div class="errorRate">
            <dv-border-box-9>
              <orderRate :errorOrderCount="errorOrderCount" :normalOrderCount="processedOrderCount"/>
            </dv-border-box-9>
          </div>
        </div>
        <div class="content-bottom">
          <div class="orderNum">
            <dv-border-box-8>
              <orderData :dateArray="timeArray" :orderNum="orderCountArray" :errorOrderNum="errorOrderCountArray" :normalOrder="normalOrderArray" :normalRate="normalRateArray" :titleText="titleText"/>
            </dv-border-box-8>
          </div>
          <div class="goodNum">
            <dv-border-box-8 :reverse="true">
               <goodData :dateArray="timeArray" :goodWeightArray="goodWeightArray" :goodQuantityArray="goodQuantityArray" :titleText="titleText"/>
            </dv-border-box-8>
          </div>
        </div>
      </div>
    </dv-border-box-11>
  </div>
</template>
<script>
import Vue from 'vue'
import AMap from 'AMap'
// import orderNum from '../../components/content/homePageCharts/orderNum.vue'
// import errorOrderNum from '../../components/content/homePageCharts/errorOrderNum'
// import goodWeight from '../../components/content/homePageCharts/goodWeight.vue'
// import goodQuantity from '../../components/content/homePageCharts/goodQuantity.vue'
import companyOrderData from '../../components/content/homePageCharts/companyOrderData.vue'
import orderRate from '../../components/content/homePageCharts/orderRate.vue'
import goodData from '../../components/content/homePageCharts/goodData.vue'
import orderData from '../../components/content/homePageCharts/orderData.vue'
import { getOrderSum, getOrderSumByDay, getOrderSumByMonth, getOrderSumByDate, getEveryCompanyData } from '../../network/requestDatas'
export default {
  name: "goverHomePage",
  components: {
    // orderNum,
    // errorOrderNum,
    // goodWeight,
    // goodQuantity,
    companyOrderData,
    goodData,
    orderData,
    orderRate
  },
  data() {
    return {
      processedOrderCount: 0,
      processedQuantityCount: 0,
      processedWeightCount: 0,
      processingOrderCount: 0,
      errorOrderCount: 0,
      yesterdayOrderCount: 0,
      yesterdayQuantityCount: 0,
      yesterdayWeightCount: 0,
      titleText: "近7天",
      timeArray: [],
      orderCountArray: [],
      normalOrderArray: [],
      errorOrderCountArray: [],
      normalRateArray: [],
      goodWeightArray: [],
      goodQuantityArray: [],
      everyCompanyDataArr: [],
      durationOptions: [
        {
          value: "7",
          label: "近7天"
        },
        {
          value: "30",
          label: "近30天"
        },
        {
          value: "6",
          label: "近6个月"
        },
        {
          value: "12",
          label: "近12个月"
        }
      ],
      selectedDuration: "7",
    }
  },
  created () {
    this.getTimeArray(this.selectedDuration)
    this.getOrderSum(2, 5)
    this.getOrderSum(2, 3)
    this.getOrderSumArray(2, this.selectedDuration)
    this.getYesterdayOrderSum(2)
    this.getEveryCompanyData()
  },
  methods:{
    getOrderSum (type, state, companyId) {
      getOrderSum(type, state, companyId).then(res => {
        if(res.data != null) {
          if(state === 3){
            this.processingOrderCount = res.data.orderCount != null ? res.data.orderCount : 0
          }else if(state === 5){
            this.processedOrderCount = res.data.orderCount != null ? res.data.orderCount : 0
            this.processedQuantityCount = res.data.quantityCount != null ? res.data.quantityCount : 0
            this.processedWeightCount = res.data.weightCount != null ? res.data.weightCount : 0
            this.errorOrderCount = res.data.errorOrderCount != null ? res.data.errorOrderCount : 0
          }
        }
      })
    },
    getOrderSumArray(type, duration, companyId) {
      this.orderCountArray = []
      this.errorOrderCountArray = []
      this.goodWeightArray = []
      this.goodQuantityArray = []
      for(let i = 0; i < duration; i++){
        this.orderCountArray.push(0)
        this.errorOrderCountArray.push(0)
        this.goodWeightArray.push(0)
        this.goodQuantityArray.push(0)
      }
      if(duration == 7 || duration == 30){
        getOrderSumByDay(type, duration, companyId).then(res => {
          if(res.data != null) {
            res.data.forEach(element => {
              if(element.orderCount != null){
                Vue.set(this.orderCountArray,this.timeArray.indexOf(element.date.slice(5)),element.orderCount)
              }
              if(element.errorOrderCount != null){
                Vue.set(this.errorOrderCountArray,this.timeArray.indexOf(element.date.slice(5)),element.errorOrderCount)
              }
              if(element.weightCount != null){
                Vue.set(this.goodWeightArray,this.timeArray.indexOf(element.date.slice(5)),element.weightCount)
              }
              if(element.quantityCount != null){
                Vue.set(this.goodQuantityArray,this.timeArray.indexOf(element.date.slice(5)),element.quantityCount)
              }
            });
          }
          this.normalOrderArray = []
          for(let i = 0; i < this.orderCountArray.length; i++){
            this.normalOrderArray.push(this.orderCountArray[i] - this.errorOrderCountArray[i])
          }
          this.normalRateArray = []
          for(let i = 0; i < this.orderCountArray.length; i++){
            if(this.orderCountArray[i] == 0){
              this.normalRateArray.push(100)
            }else{
              this.normalRateArray.push(((this.orderCountArray[i] - this.errorOrderCountArray[i])/this.orderCountArray[i]).toFixed(2)*100)
            }
          }
        })
      }else if(duration == 6 || duration == 12){
        getOrderSumByMonth(type, duration, companyId).then(res => {
          if(res.data != null) {
            res.data.forEach(element => {
              if(element.orderCount != null){
                Vue.set(this.orderCountArray,this.timeArray.indexOf(element.colMonth),element.orderCount)
              }
              if(element.errorOrderCount != null){
                Vue.set(this.errorOrderCountArray,this.timeArray.indexOf(element.colMonth),element.errorOrderCount)
              }
              if(element.weightCount != null){
                Vue.set(this.goodWeightArray,this.timeArray.indexOf(element.colMonth),element.weightCount)
              }
              if(element.quantityCount != null){
                Vue.set(this.goodQuantityArray,this.timeArray.indexOf(element.colMonth),element.quantityCount)
              }
            })
          }
          this.normalOrderArray = []
          for(let i = 0; i < this.orderCountArray.length; i++){
            this.normalOrderArray.push(this.orderCountArray[i] - this.errorOrderCountArray[i])
          }
          this.normalRateArray = []
          for(let i = 0; i < this.orderCountArray.length; i++){
            if(this.orderCountArray[i] == 0){
              this.normalRateArray.push(100)
            }else{
              this.normalRateArray.push(((this.orderCountArray[i] - this.errorOrderCountArray[i])/this.orderCountArray[i]).toFixed(2)*100)
            }
          }
        })
      }
    },
    //获取昨日相关数据
    getYesterdayOrderSum(type, companyId) {
      const today = new Date()
      let yesterday = new Date()
      yesterday.setTime(today.getTime()-1000*60*60*24)
      let month = yesterday.getMonth()
      let date = yesterday.getDate()
      month = month+1 < 10 ? "0" + (month+1) : month+1
      date = date < 10 ? "0" + date : date
      yesterday = yesterday.getFullYear()+"-"+month+"-"+date
      getOrderSumByDate(type, yesterday, companyId).then(res => {
        if(res.data != null){
          this.yesterdayOrderCount = res.data.orderCount != null ? res.data.orderCount : 0
          this.yesterdayQuantityCount = res.data.quantityCount != null ? res.data.quantityCount : 0
          this.yesterdayWeightCount = res.data.weightCount != null ? res.data.weightCount : 0
        }
      })
    },
    getEveryCompanyData() {
      getEveryCompanyData().then(res => {
        console.log(res.data);
        for (let company of res.data){
          let dataArr = []
          dataArr.push(company.companyName)
          dataArr.push(company.orderCount)
          dataArr.push(company.quantityCount)
          dataArr.push(company.weightCount)
          this.everyCompanyDataArr.push(dataArr)
        }
        console.log(this.everyCompanyDataArr);
      })
    },
    getTimeArray(timeNumber) {
      this.timeArray = []
      const today = new Date();
      if(timeNumber == 7 || timeNumber == 30){
        today.setTime(today.getTime()+1000*60*60*24)
        for(let i = 0; i<timeNumber; i++){
          const targetday_milliseconds=today.getTime() - 1000*60*60*24;
          today.setTime(targetday_milliseconds);
          let tMonth = today.getMonth();
          let tDate = today.getDate();
          tMonth = (tMonth + 1) < 10 ? "0"+(tMonth + 1) : (tMonth + 1)
          tDate = tDate < 10 ? "0"+ tDate : tDate
          this.timeArray.push(tMonth+"-"+tDate);
        }
      }else if(timeNumber == 6 || timeNumber == 12){
        today.setMonth(today.getMonth()+1, 1)//获取到当前月份,设置月份
        for (let i = 0; i < timeNumber; i++) {
          today.setMonth(today.getMonth() - 1);//每次循环一次 月份值减1
          let m = today.getMonth() + 1;
          m = m < 10 ? "0" + m : m;
          this.timeArray.push(today.getFullYear() + "-" + (m))
        }
      }
      this.timeArray.reverse()
    },
    handleSelectedDurationChanged(val){
      this.selectedDuration = val
      this.getTimeArray(this.selectedDuration)
      this.getOrderSumArray(2,this.selectedDuration)
      if(val == 7){
        this.titleText = "近7天"
      }else if(val == 30){
        this.titleText ="近30天"
      }else if(val == 6){
        this.titleText = "近6个月"
      }else if(val == 12){
        this.titleText = "近12个月"
      }
    },
    drawMap(){
      // var SOC = 'CHN'
      // var colors = {};
      // var GDPSpeed = {
      //   '520000':10,//贵州
      //   '540000':10,//西藏
      //   '530000':8.5,//云南 
      //   '500000':8.5,//重庆
      //   '360000':8.5,//江西
      //   '340000':8.0,//安徽
      //   '510000':7.5,//四川
      //   '350000':8.5,//福建
      //   '430000':8.0,//湖南
      //   '420000':7.5, //湖北
      //   '410000':7.5,//河南
      //   '330000':7.0,//浙江
      //   '640000':7.5,//宁夏
      //   '650000':7.0,//新疆
      //   '440000':7.0,//广东
      //   '370000':7.0,//山东
      //   '450000':7.3,//广西
      //   '630000':7.0,//青海
      //   '320000':7.0,//江苏
      //   '140000':6.5,//山西
      //   '460000':7,// 海南
      //   '310000':6.5,//上海
      //   '110000':6.5, // 北京
      //   '130000':6.5, // 河北
      //   '230000':6, // 黑龙江
      //   '220000':6,// 吉林
      //   '210000':6.5, //辽宁
      //   '150000':6.5,//内蒙古
      //   '120000':5,// 天津
      //   '620000':6,// 甘肃
      //   '610000':8.5,// 甘肃
      //   '710000':2.64, //台湾
      //   '810000':3.0, //香港
      //   '820000':4.7 //澳门
      // }
      // var getColorByDGP = function(adcode){
      //   if(!colors[adcode]){
      //     var gdp = GDPSpeed[adcode];
      //     if(!gdp){
      //       colors[adcode] = 'rgb(227,227,227)'
      //     }else{   
      //       var r = 3;
      //       var g = 140;
      //       var b = 230;
      //       var a = gdp/10;
      //       colors[adcode] = 'rgba('+ r +','+ g +','+b+','+a+')';
      //     }
      //   }
      //   return colors[adcode]
      // }
      AMap.plugin('AMap.DistrictLayer', function(){
        var disCountry = new AMap.DistrictLayer.Country({
          zIndex:10,
          SOC:'CHN',
          depth:1,
          styles:{
            'nation-stroke':'#ff0000',
            'coastline-stroke':'#0088ff',
            'province-stroke':'#888888',
            'fill':'#13192f99'
            // function(props){
            //   return getColorByDGP(props.adcode_pro)
            // }
          }

        })
        var map = new AMap.Map("mapContainer",{
        zooms: [3],
        center:[106.122082,33.719192],
        zoom: 3,
        isHotspot:false,
        defaultCursor:'pointer',
        layers:[
          disCountry
        ],
        viewMode:'2D',
        resizeEnable: true
      })
      const marker = new AMap.Marker({
        position:[106.122082,33.719192]
      })
      map.add(marker)
      // map.addControl(new AMap.Scale());
      // map.addControl(new AMap.ToolBar({liteStyle:true}));
      // map.on('complete',function(){
      //   var layer = new AMap.LabelsLayer({
      //     collision: false,
      //     animation: true,
      //   });
      //   for (var i = 0; i < LabelsData.length; i++) {
      //     var labelsMarker = new AMap.LabelMarker(LabelsData[i]);
      //     layer.add(labelsMarker);
      //   }
      //   map.add(layer);
      //   document.getElementsByClassName('amap-mcode')[0].innerHTML = '-GS(2019)756号'
      // })
      })
    }
  }
}
</script>
<style scoped>
.all-container{
  background-color: #020308;
  height: 100%;
}
.all-content{
  height: 100%;
  padding: 60px 20px 25px;
  box-sizing: border-box;
}
.content-top{
  display: flex;
  height: 50%;
  width: 100%;
}
.company-data{
  height: 100%;
  width: 100%;
}
.statistic-data{
  height: 100%;
  width: 100%;
}
.errorRate{
  height: 100%;
  width: 100%;
}
.content-bottom{
  display: flex;
  height: 50%;
  width: 100%;
}
.orderNum{
  width: 50%;
  height: 100%;
}
.goodNum{
  width: 50%;
  height: 100%;
}
.content-left{
  flex: 1;
  background-color: #13192f99  ;
  /* height: 100%; */
}
.center-content{
  height: 100%;
  padding: 20px 20px 25px;
  box-sizing: border-box;
  /* background-color: salmon; */
}
.selection{
  text-align: center;
  margin-bottom: 10px;
}
.statistic-data{
  /* color: #257DFF; */
  color: #fff;
  font-size: 12px;
}
.top-data, .center-data, .bottom-data{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin-bottom: 10px;
}
.top-data-content{
  padding: 15px 10px;
  text-align: center;
}
#mapContainer{
  height: 100%;
  width: 100%;
  background-color: #020308 !important;
  /* background-color: blue !important; */
}
</style>
<style>
.selection>.el-select>.el-input>.el-input__inner{
  background-color: rgb(12, 17, 33) !important;
  border: 1px solid rgb(46, 96, 153);
}
.el-select-dropdown{
  background-color: rgb(12, 17, 33);
  border: 1px solid rgb(46, 96, 153);
}
.el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
  background-color: rgb(12, 17, 33);
}
</style>