<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="creatorId">
                    <el-input
                        v-model="param.creatorId"
                        placeholder="请输入账号"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <!-- <p class="login-tips">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { login } from '../../network/requestDatas'
export default {
    data: function() {
        return {
            param: {
                creatorId: '',
                password: '',
            },
            rules: {
                creatorId: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    created () {
        if(localStorage.getItem('ms_username')){
            Vue.set(this.param, "creatorId", localStorage.getItem('ms_username'))
        }
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    console.log(JSON.parse(JSON.stringify(this.param)));
                    login(this.param).then(res => {
                        if(res.code === 0){
                            console.log(res);
                            console.log(this.param.password);
                            this.$store.commit("setUserName", this.param.creatorId)
                            this.$store.commit("setPassword", this.param.password)
                            this.$store.commit("setUserKind", res.data.kind)
                            console.log(this.$store.state);
                            localStorage.setItem('ms_username', this.param.creatorId);
                            localStorage.setItem('token', this.param.creatorId);
                            if(res.data.kind === 2){
                                this.$router.push('/goverHomePage')
                            }else if(res.data.kind === 3){
                                this.$router.push('/processingOrdersSum')
                            }else if(res.data.kind === 4){
                                this.$router.push('/companyHomePage')
                            }
                            this.$message.success('登录成功');
                        }else if (res.code === 2001){
                            this.$message.error('账号或密码错误');
                        }
                    })
                } else {
                    this.$message.error('请输入账号和密码');
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>