<template>
  <div class="all-container">
    <dv-border-box-11 title="猪肉冷链运输监控系统" :titleWidth="300">
      <div class="all-content">
        <div class="content-top">
          <div class="company-data">
            <dv-border-box-13>
              <companyOrderData/>
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
        <!-- <div class="content-left">
          <div class="orderNum" style="height:50%">
            <dv-border-box-8>
               <orderNum :dateArray="timeArray" :orderNumArray="orderCountArray" />
            </dv-border-box-8>
          </div>
          <div class="errorOrderNum" style="height:50%">
            <dv-border-box-13>
               <errorOrderNum :dateArray="timeArray" :errorOrderNumArray="errorOrderCountArray" />
            </dv-border-box-13>
          </div>
        </div>
        <div class="content-center">
          <dv-border-box-1>
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
              <div class="statistic-data">
                <div class="top-data">
                  <dv-border-box-7>
                    <div class="top-data-content">
                      <p>已完成订单数量</p>
                      <p>{{ processedOrderCount }}</p>
                    </div>
                  </dv-border-box-7>
                  <dv-border-box-7>
                    <div class="top-data-content">
                      <p>已完成货物数量</p>
                      <p>{{ processedQuantityCount }}头</p>
                    </div>
                  </dv-border-box-7>
                  <dv-border-box-7>
                    <div class="top-data-content">
                      <p>已完成货物重量</p>
                      <p>{{ processedWeightCount }}吨</p>
                    </div>
                  </dv-border-box-7>
                  <dv-border-box-7>
                    <div class="top-data-content">
                      <p>异常订单数量</p>
                      <p>{{ errorOrderCount }}</p>
                    </div>
                  </dv-border-box-7>
                </div>
                <div class="bottom-data">
                  <dv-border-box-7>
                    <div class="top-data-content">
                      <p>昨日新增订单数量</p>
                      <p>{{ yesterdayOrderCount }}</p>
                    </div>
                  </dv-border-box-7>
                  <dv-border-box-7>
                    <div class="top-data-content">
                      <p>昨日新增货物数量</p>
                      <p>{{ yesterdayQuantityCount }}头</p>
                    </div>
                  </dv-border-box-7>
                  <dv-border-box-7>
                    <div class="top-data-content">
                      <p>昨日新增货物重量</p>
                      <p>{{ yesterdayWeightCount }}吨</p>
                    </div>
                  </dv-border-box-7>
                  <dv-border-box-7>
                    <div class="top-data-content">
                      <p>运行中订单数量</p>
                      <p>{{ processingOrderCount }}</p>
                    </div>
                  </dv-border-box-7>
                </div>
              </div>
              <div class="map">
                <div id="mapContainer">

                </div>
                <div class="left-ring"></div>
                <div class="right-ring"></div>
              </div>
            </div>
          </dv-border-box-1>
        </div>
        <div class="content-right">
          <div class="goodWeight" style="height:50%">
            <dv-border-box-12>
              <goodWeight :dateArray="timeArray" :goodWeightArray="goodWeightArray" />
            </dv-border-box-12>
          </div>
          <div class="goodQuantity" style="height:50%">
            <dv-border-box-8 :reverse="true">
              <goodQuantity :dateArray="timeArray" :goodQuantityArray="goodQuantityArray"/>
            </dv-border-box-8>
          </div>
        </div> -->
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
import { getOrderSum, getOrderSumByDay, getOrderSumByMonth, getOrderSumByDate } from '../../network/requestDatas'
export default {
  name: "companyHomePage",
  components: {
    // orderNum,
    // errorOrderNum,
    // goodWeight,
    // goodQuantity,
    companyOrderData,
    orderRate,
    goodData,
    orderData
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
  computed: {
    companyId () {
      return this.$store.state.userName
    }
  },
  created () {
    this.getTimeArray(this.selectedDuration)
    this.getOrderSum(1, 5, this.companyId)
    this.getOrderSum(1, 3, this.companyId)
    this.getOrderSumArray(1, this.selectedDuration, this.companyId)
    this.getYesterdayOrderSum(1, this.companyId)
  },
  // mounted() {
  //   this.drawMap()
  // },
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
          if(res.data != null){
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
      this.getOrderSumArray(1, this.selectedDuration, this.companyId)
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