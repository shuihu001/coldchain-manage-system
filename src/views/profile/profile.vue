<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item>
              <i class="el-icon-lx-cascades"></i> 个人中心
          </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="change-password">
        <el-form :model="passwordForm" :rules="rules" ref="passwordForm" label-width="100px">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="passwordForm.oldPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="passwordForm.newPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="againNewPassword">
            <el-input v-model="passwordForm.againNewPassword" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm()">重置</el-button>
            <el-button type="primary" @click="submitForm()">立即修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { companyAccountChangePassword, adminChangePassword } from '../../network/requestDatas'
export default {
  name: "profile",
  data () {
    return {
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        againNewPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        againNewPassword: [
          { required: true, message: '请再次确认密码', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    console.log(this.$store.state.password);
    console.log(this.$store.state.userKind);
  },
  methods: {
    resetForm() {
      this.$refs["passwordForm"].resetFields();
    },
    submitForm() {
      this.$refs["passwordForm"].validate((valid) => {
        if(valid) {
          if (this.passwordForm.oldPassword !== this.$store.state.password) {
            this.$message.error("密码错误，请重试");
          }else if(this.passwordForm.newPassword !== this.passwordForm.againNewPassword){
            this.$message.error("两次密码不一致，请重新输入");
          }else {
            if(this.$store.state.userKind == 2 || this.$store.state.userKind == 3){
              adminChangePassword(this.$store.state.userName, this.passwordForm.newPassword).then(res => {
                console.log(res);
                if(res.code == 0){
                  this.$message.success("修改成功,请重新登录")
                  this.$router.push('/login')
                  localStorage.setItem("token", "")
                }
              })
            }else if(this.$store.state.userKind == 4) {
              console.log(this.$store.state.userName);
              console.log(this.passwordForm.newPassword);
              companyAccountChangePassword(this.$store.state.userName, this.passwordForm.newPassword).then(res => {
                console.log(res);
                if(res.code == 0){
                  this.$message.success("修改成功,请重新登录")
                  this.$router.push('/login')
                  localStorage.setItem("token", "")
                }
              })
            }
          }
        }else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped>
.change-password{
  width: 400px;
  margin: 0 auto;
}
</style>