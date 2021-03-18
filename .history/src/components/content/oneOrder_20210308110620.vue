<!--  -->
<template>
<div class='oneOrder'>
    <table class="oneOrderTable" border="0"  cellpadding="0" cellspacing="1">
			<col width="100px">
			<col width="100px">
			<col width="100px">
			<col width="100px">
			<col width="120px">

        <tr height="20px" align="center">
				<td>运单号{{ this.oneOrder.orderNum }}</td>
				<td></td>
				<td>创建时间{{ this.oneOrder.creatTime }}</td>
				<td></td>
				<td rowspan="3"><button class="detailBtn">查看详情</button></td>
			</tr>
			 
			<tr height="40px" align="center" class="place">
				<td>{{ this.oneOrder.startPlace }}</td>
				<td><img src="../../assets/img/rightArrow.svg" class="rightArrow"></td>
                <td>{{ this.oneOrder.endPlace }}</td>
				<td></td>
			</tr>
			<tr height="40px" align="center">
				<td>{{ this.oneOrder.licenseNum }}</td>
                <td>{{ this.oneOrder.driverName }}</td>
				<td>{{ this.oneOrder.phoneNum }}</td>
				<td></td>
			</tr>
    </table>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

    export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    props: {
      oneOrder: {
        type: Object,
        default: function() {
            return {orderNum:'xx123545',creatTime:'2020.12.12',startPlace:'江西上饶',endPlace:'北京邮电大学',licenseNum:'赣12345',driverName:'张三',phoneNum:13051578190}
        }
      },
    },
    data() {
    //这里存放数据

    return {

    };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

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
    font-size: 16px;
}

.rightArrow {
    width: 120px;
    height: 65px;
}

.detailBtn {
    width: 100px;
    height: 30px;
    font-size: 14px;
    line-height: 14px;
    color: #fff;
    background-color: #69f;
}
</style>