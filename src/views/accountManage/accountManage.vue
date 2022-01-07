<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>
              <i class="el-icon-lx-cascades"></i> 账号管理
          </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container" v-show="userKind==2">
      <div class="add-account">
        <el-button type="primary" @click="companyDialogVisible = true">添加公司</el-button>
      </div>
      <div class="table">
        <el-table
          :data="companyAccountList"
          border
          style="">
          <el-table-column
            align="center"
            prop="companyId"
            label="公司账号"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="companyName"
            label="公司名称"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="companyContactName"
            label="公司联系人"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="companyContactPhonenumber"
            label="联系方式"
          >
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="添加公司"
        top="15%"
        :visible.sync="companyDialogVisible"
        width="30%">
        <el-form :model="companyAccountForm" :rules="companyValidRules" ref="companyAccountForm" label-width="100px">
          <el-form-item label="公司名称" prop="companyName">
            <el-input v-model="companyAccountForm.companyName"></el-input>
          </el-form-item>
          <el-form-item label="公司联系人" prop="companyContactName">
            <el-input v-model="companyAccountForm.companyContactName"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="companyContactPhonenumber">
            <el-input v-model="companyAccountForm.companyContactPhonenumber" maxlength="11"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="companyDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAccount()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="container" v-show="userKind==4">
      <div class="add-account">
        <el-button type="primary" @click="creatorDialogVisible = true">添加订单员</el-button>
      </div>
      <div class="table">
        <el-table
          :data="creatorAccountList"
          border
          style="">
          <el-table-column
            align="center"
            prop="creatorId"
            label="订单员账号"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="name"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="department"
            label="部门名称"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="teleNum"
            label="联系方式"
          >
          </el-table-column>
        </el-table>
      </div>
      <el-dialog
        title="添加订单员"
        top="15%"
        :visible.sync="creatorDialogVisible"
        width="30%">
        <el-form :model="creatorAccountForm" :rules="creatorValidRules" ref="creatorAccountForm" label-width="100px">
          <el-form-item label="订单员姓名" prop="name">
            <el-input v-model="creatorAccountForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门名称" prop="department">
            <el-input v-model="creatorAccountForm.department"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" prop="teleNum">
            <el-input v-model.number="creatorAccountForm.teleNum" maxlength="11"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="creatorDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAccount()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { addCompanyAccount, addCreatorAccount, getCompanyAccount, getCreatorAccount } from '../../network/requestDatas'
export default {
  name: "accountManage",
  data () {
    return {
      companyAccountList: [],
      creatorAccountList: [],
      companyAccountForm: {
        companyName: "",
        kind: 4,
        companyContactName: "",
        companyContactPhonenumber: ""
      },
      creatorAccountForm: {
        name: "",
        kind: 1,
        companyId: this.$store.state.userName,
        teleNum: null,
        department: ""
      },
      companyValidRules:{
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
        ],
      },
      creatorValidRules: {
        name: [
          { required: true, message: '请输入订单员姓名', trigger: 'blur' },
        ],
        teleNum: [
          { type: 'number', message: '联系方式必须为数字', trigger: 'blur'},
        ]
      },
      companyDialogVisible: false,
      creatorDialogVisible: false
    }
  },
  computed: {
    userKind () {
      return this.$store.state.userKind
    }
  },
  created() {
    if(this.userKind == 2){
      getCompanyAccount().then(res => {
        console.log(res.data);
        this.companyAccountList = res.data
      })
    }else if(this.userKind == 4){
      getCreatorAccount(this.$store.state.userName).then(res => {
        console.log(res.data);
        this.creatorAccountList = res.data
      })
    }
  },
  methods: {
    addAccount(){
      if(this.userKind == 2){
        this.$refs.companyAccountForm.validate((valid) => {
          if(valid){
            addCompanyAccount(this.companyAccountForm).then(res => {
              console.log(res);
              if(res.code == 0){
                this.companyDialogVisible = false
                getCompanyAccount().then(res => {
                  console.log(res.data);
                  this.companyAccountList = res.data
                })
              }
            })
          }else{
            return false
          }
        })
      }else if(this.userKind == 4){
        this.$refs.creatorAccountForm.validate((valid) => {
          if(valid) {
            console.log(this.creatorAccountForm);
            addCreatorAccount(this.creatorAccountForm).then(res => {
              console.log(res);
              if(res.code == 0){
                this.creatorDialogVisible = false
                getCreatorAccount(this.$store.state.userName).then(res => {
                  console.log(res.data);
                  this.creatorAccountList = res.data
                })
              }
            })
          }else{
            return false
          }
        })
      }
      
    }
  }
}
</script>
<style scoped>
.container{
  height: 100%;
  text-align: center;
}
.add-account{
  text-align: end;
  margin-bottom: 10px;
}
.add-account .el-button{
  font-size: 16px;
}
.table{
  text-align: center;
}
.el-table{
  font-size: 16px;
}

</style>