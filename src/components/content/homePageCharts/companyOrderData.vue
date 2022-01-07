<template>
  <div style="height:100%">
    <div id="company-order-data">
      <div class="table-title">
        <dv-decoration-7 style="width:100%;height:20px;">
          <span class="title-text" v-show="userKind == 2">各公司订单数据统计</span>
          <span class="title-text" v-show="userKind == 4">各省份订单数据统计</span>
        </dv-decoration-7>
      </div>
      <div class="table-content">
        <dv-scroll-board :config="config" style="width:100%;height:100%" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "companyOrderData",
  props: {
    everyCompanyData: {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  computed: {
    userKind () {
      return this.$store.state.userKind
    },
    config () {
      if(this.userKind == 2){
        return {
          header: ['公司名称', '订单数量', '货物数量(头)','货物重量(吨)'],
            data: [
              ['顺鑫农业', 456, 215,172],
              ['顺鑫农业', 456, 215,142],
              ['顺鑫农业', 456, 251,712],
              ['顺鑫农业', 456, 251,142],
              ['顺鑫农业', 456, 215,142],
              ['顺鑫农业', 456, 215,172],
            ],
          // data: this.everyCompanyData,
          index: true,
          columnWidth: [50],
          rowNum: 4,
          align: ['center'],
          fontSize: "10px"
        }
      }else if (this.userKind == 4){
        return {
          header: ['省份', '订单数量', '货物数量(头)','货物重量(吨)'],
          data: [
            ['河北省', 10, 50,5],
            ['辽宁省', 10, 50,5],
            ['河南省', 10, 50,5],
            ['黑龙江省',10,50,5],
            ['山西省', 10, 50,5],
            ['山东省', 10, 50,5],
          ],
          index: true,
          columnWidth: [50],
          rowNum: 4,
          align: ['center'],
          fontSize: "10px"
        }
      }
    }
  },
  created() {
    console.log(this.userKind);
  }
}
</script>
<style scoped>
#company-order-data{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px ;
  /* background-color: rosybrown; */
}
.table-title{
  /* display: flex; */
  height: 30px;
}
.title-text{
  padding: 0 10px;
  color: aqua;
  font-size: 13px;
}
.table-content{
  height: 85%;
}
</style>
<style>
.dv-scroll-board .header .header-item{
  text-align: center;
  padding: 0 !important;
  font-size: 12px;
}
.dv-scroll-board .rows .ceil{
  text-align: center;
  font-size: 12px;
}
</style>