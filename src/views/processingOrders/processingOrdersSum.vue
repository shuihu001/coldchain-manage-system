<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 执行中的订单
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name" placeholder="请输入始发地或目的地或运单号进行查询" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>

            <one-order
              v-for="oneOrder in showOrderData"
              :one-order="oneOrder"
              :key="oneOrder.id"
              @detailSearch = "detailSearch(oneOrder)"
            >
            </one-order>
            <!-- 分页 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next"
                :total="orderData.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import oneOrder from '../../components/content/oneOrder'
import { getOrders, getOrdersIncludeDriverName } from '../../network/requestDatas';
export default {
    name: 'processingOrdersSum',
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
          showOrderData: [],
          currentPage: 1,
          pageSize: 10,
        };
    },
    components: {
        'one-order': oneOrder,
    },
    created() {
        this.getOrderData(this.$store.state.userName, 3)
    },
    methods: {
        detailSearch(order) {
          //将对象转换成字符串再传过去，可以保证在详情页刷新时参数不会丢失
          let newOrder = JSON.stringify(order)
          // 需要添加判断逻辑，觉得跳转页面的路径
            this.$router.push({
              path:'/processingOrdersDetail',
              query:{
                order:newOrder
              }
            })
        },
        getOrderData(companyId, completeState){
            console.log(companyId);
            if(this.$store.state.userKind == 4){
                getOrders(companyId, completeState).then(res =>{
                    console.log(res);
                    console.log(res.data);
                    if (this.query.name !== ''){
                        this.orderData = res.data.filter(item => item.id.toString().match(this.query.name) || item.starting.match(this.query.name) || item.destination.match(this.query.name)).reverse();
                    }else {
                        this.orderData = res.data.reverse()
                    }
                    this.showOrderData = this.orderData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                }).catch(err => {
                    console.log(err);
                })
            }else{
                getOrdersIncludeDriverName(companyId, completeState).then(res =>{
                    console.log(res);
                    console.log(res.data);
                    if (this.query.name !== ''){
                        this.orderData = res.data.filter(item => item.id.toString().match(this.query.name) || item.starting.match(this.query.name) || item.destination.match(this.query.name)).reverse();
                    }else {
                        this.orderData = res.data.reverse()
                    }
                    this.showOrderData = this.orderData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        handleSizeChange(val){
          this.pageSize = val
          this.showOrderData = this.orderData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
      },
      handleCurrentChange(val){
          this.currentPage = val
          this.showOrderData = this.orderData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
      },
        // 触发搜索按钮
        handleSearch() {
            // this.$set(this.query, 'pageIndex', 1);
            this.getOrderData(3);
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
