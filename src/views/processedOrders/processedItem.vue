<template>
  <div class='oneOrder'>
    <table class="oneOrderTable" border="0"  cellpadding="0" cellspacing="1">
      <col width="100px">
      <col width="100px">
      <col width="120px">
      <col width="30px">
      <col width="120px">

      <tr height="20px" align="center">
        <td>运单号{{ this.orderData.id }}</td>
        <td>
          <!--          <span v-if="oneOrder.abnormal==1" class="abnormal">温度异常</span>-->
          <!--          <span v-if="oneOrder.abnormal==2" class="abnormal">湿度异常</span>-->
          <!--          <span v-if="oneOrder.abnormal==3" class="abnormal">开门异常</span>-->
          <!--          <span v-if="oneOrder.finished" class="finished">运行中</span>-->
          <span class="finished">已完成</span>
        </td>
        <td>创建时间{{ this.orderData.createTime }}</td>
        <td></td>
        <td rowspan="3">
          <!-- <button class="detailBtn">查看详情</button> -->
          <el-button type="primary" @click="detailSearch">查看详情</el-button>
        </td>
      </tr>

      <tr height="30px" align="center" class="place">
        <td>{{ this.orderData.starting }}</td>
        <td><img src="../../assets/img/rightArrow.svg" class="rightArrow"></td>
        <td>{{ this.orderData.destination }}</td>
        <td></td>
      </tr>
      <tr height="20px" align="center" style="font-size: 16px">

        <!--        <td>{{ this.driverInfo.driverName }}</td>-->
        <td></td>
        <!--        <td>{{ this.driverInfo.phoneNum }}</td>-->
        <td>{{ this.orderData.carId }}</td>
        <td></td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: "processedItem",
    components: {},
    props: {
      orderData: Object,
      driverInfo:Object
    },
    methods: {
      detailSearch() {
        // 需要添加判断逻辑，觉得跳转页面的路径
        console.log("点击了");
        console.log(this.orderData.id);
        this.$router.push({
          path:'/processedOrdersDetail',
          query:{
            id:this.orderData.id
          }
        })
        // this.$router.push('/processingOrdersDetail')
        // this.$parent.detailSearch()
        // this.$router.push('/goodVIdeo')
        // this.$parent.detailSearch()
      }
    },
  }
</script>

<style scoped>
  /*@import url(); 引入公共css类*/
  .oneOrderTable {
    border:1px solid #424242;
    border-radius: 10px;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .place {
    font-size: 14px;
  }

  .rightArrow {
    width: 120px;
    height: 40px;
  }

  .abnormal {
    position: relative;
    top: 14px;
    color: red;
  }

  .finished {
    position: relative;
    top: 14px;
  }
</style>