<!--  -->
<template>
<div class='oneOrder'>
  <table class="oneOrderTable" border="0"  cellpadding="0" cellspacing="1">
			<col width="100px">
			<col width="100px">
			<col width="120px">
			<col width="30px">
			<col width="120px">

        <tr height="20px" align="center">
				<td>运单号{{ orderId }}</td>
				<td>
          <span v-if="oneOrder.completeState == 3 && oneOrder.alert==0" class="finished">进行中</span>
          <span v-if="oneOrder.completeState == 5 && oneOrder.alert==0" class="finished">已完成</span>
          <span v-if="oneOrder.alert==1" class="abnormal">温度异常</span>
          <span v-if="oneOrder.alert==2" class="abnormal">湿度异常</span>
          <span v-if="oneOrder.alert==3" class="abnormal">车门开关异常</span>


        </td>
				<td>
          <p>出发时间</p>
          <p>{{ this.oneOrder.date }}</p>
        </td>
				<td></td>
				<td rowspan="3">
                    <!-- <button class="detailBtn">查看详情</button> -->
<!--          <el-button type="primary" @click="detailSearch(this.oneOrder.id)">查看详情</el-button>-->
          <el-button type="primary" :key="this.oneOrder.id" @click="detailSearch">查看详情</el-button>
        </td>
			</tr>
			 
			<tr height="30px" align="center" class="place">
				<td>{{ this.oneOrder.starting }}</td>
				<td><img src="../../assets/img/rightArrow.svg" class="rightArrow"></td>
        <td>{{ this.oneOrder.destination }}</td>
				<td></td>
			</tr>
			<tr height="20px" align="center">
        <td></td>
        <td>{{ this.oneOrder.carId }}</td>
				<td></td>
				<td></td>
			</tr>
    </table>
</div>
</template>
<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
export default {
  name:'oneOrder',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
      oneOrder: {
        type: Object,
        default: function() {
          return {
            id:'xx123545',creatTime:'2020.12.12',startPlace:'江西上饶',endPlace:'北京邮电大学',licenseNum:'赣12345',driverName:'张三',phoneNum:13051578190}
        }
      },
    },
    data() {
    //这里存放数据
    return {
      id:44
    };
    },
    //监听属性 类似于data概念
    computed: {
      orderId(){
        if(this.oneOrder.id){
          return this.oneOrder.id
        }else if(this.oneOrder.orderId) {
          return this.oneOrder.orderId
        }
      }
    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      detailClick(t){
        console.log(t);
      },
        detailSearch() {
            // 需要添加判断逻辑，觉得跳转页面的路径
            // this.$router.push('/processingOrdersDetail')
            // this.$router.push('/goodVIdeo')
            // this.$parent.detailSearch()
          this.$emit('detailSearch')
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
      // console.log(this.oneOrder.id);
      // console.log(this.oneOrder);
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
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