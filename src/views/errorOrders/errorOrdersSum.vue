<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 异常订单
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="请输入始发地或目的地或运单号进行查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <one-order
              v-for="oneOrder in orderData"
              :one-order="oneOrder"
              :key="oneOrder.id"
              @detailSearch = "detailSearch(oneOrder)"
            >
            </one-order>
<!--          <error-item v-for="order in orderData" :order-data="order" :key="order.id"></error-item>-->
        </div>
    </div>
</template>

<script>
import oneOrder from '../../components/content/oneOrder'
// import errorItem from "./errorItem";
import { getErrorOrders, getOrders } from "../../network/requestDatas";
// import {fetchData, getDriver, getErrorOrders, getOrders} from '../../api/index';
export default {
    name: 'errorOrdersSum',
    data() {
        return {
            query: {
                orderNum:'',
                pageIndex: 1,
                pageSize: 1,
                name:''
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
          orderData:[],
        };
    },
    components: {
        'one-order': oneOrder,
      // errorItem
    },
    created() {
        // this.getData();
        this.getErrorOrderDatas()
      // this.getOrderData()
      // this.getDriverInfo()
    },
    methods: {
        detailSearch(order) {
          let newOrder = JSON.stringify(order)
            this.$router.push({
              path:'/errorOrdersDetail',
              query:{
                order:newOrder
              }
            })
          // this.$router.push('/errorOrdersDetail'+this.orderData[0].id)
        },
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
      // getOrderData(){
      //   getOrders().then(res =>{
      //     console.log(res.list);
      //     this.orderData.push(...res.list)
      //     console.log(this.orderData[0]);
      //   }).catch()
      // },
      // getDriverInfo(){
      //   getDriver().then(res => {
      //     console.log(res.list);
      //     this.driverInfo.push(...res.list)
      //   }).catch(err => {
      //     console.log(err);
      //   })
      // },
      getErrorOrderDatas(){
          getOrders(5).then(res=> {
            for(let order of res.data){
              if(order.alert == 1 || order.alert == 2 || order.alert == 3){
                this.orderData.push(order)
              }
            }
            this.orderData = this.orderData.reverse()
            // this.orderData.push(...res.data)
            console.log(res.data);
            if (this.query.name !== ''){
              this.orderData = this.orderData.filter(item => item.id.toString().match(this.query.name) || item.starting.match(this.query.name) || item.destination.match(this.query.name)).reverse();
            }
          }).catch()
      },
        // getErrorOrderDatas(){
        //   getErrorOrders().then(res => {
        //     // console.log(res);
        //     this.orderData.push(...res.data)
        //     console.log(res.data);
        //     if (this.query.name !== ''){
        //       this.orderData = this.orderData.filter(item => item.id.toString().match(this.query.name) || item.starting.match(this.query.name) || item.destination.match(this.query.name));
        //     }
        //     // console.log(this.orderData[0]);
        //   }).catch()
        // },
        // 触发搜索按钮
        handleSearch() {
            // this.$set(this.query, 'pageIndex', 1);
            this.getErrorOrderDatas();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
