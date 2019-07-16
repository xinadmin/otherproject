<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">智慧管理后台</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="请输入密码" />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="pwdType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

<!--      <el-form-item prop="codeImg">-->
<!--        <span class="svg-container">-->
<!--          <svg-icon icon-class="password" />-->
<!--        </span>-->
<!--        <el-input v-model="loginForm.codeImg" name="codeImg" type="text" auto-complete="on" maxlength="4" placeholder="请输入验证码" size="small" @keyup.enter.native="handleLogin" />-->
<!--        <img :src="loginCodeImg" alt="" class="code" @click="getCodeImg">-->
<!--      </el-form-item>-->

      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
      <!-- <div class="login_footer">
        <el-button type="text"  @click.native="handleRegister">立即注册</el-button>&nbsp;&nbsp;&nbsp;|
        <el-button type="text" @click.native="handleReset">忘记密码？</el-button>
      </div> -->
    </el-form>
  </div>
</template>

<script>

import { setToken,getToken,setPermission } from '@/utils/auth'
import md5 from 'js-md5'
// import controller from '@/controllers/logincontrollers'
import url from '@/utils/http_conf'

export default {
  name: 'Login',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        codeImg:''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名/手机号' }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        codeImg: [{ required: true, trigger: 'blur',  message: '请输入验证码' }],
      },
      loading: false,
      pwdType: 'password',
      redirect: undefined,
      loginToken:'',
      loginCodeImg:''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created(){
    this.getLoginToken()
  },
  methods: {
    // 显示/隐藏密码
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    // 获取登录前token
    getLoginToken(){
      this.loading = true;
			// controller.getLoginToken().then(res=>{
                this.loading = false;
                // this.loginToken = res.data
      this.loginToken = "admin"

                this.$store.commit('SET_TOKEN',this.loginToken);
				// this.getCodeImg();
			// }).catch(err=>{
			// 	this.loading = false;
			// })
    },
    //获取验证码图片
	// 	getCodeImg(){
    //         let data = {
    //             token: this.loginToken
    //         }
    //         controller.getLoginCodeImg(data).then(res=>{
    //         this.loginCodeImg = res
    //     })
	// 	},
    // 登录
    handleLogin() {
        let data = {
            loginName:this.loginForm.username,
            pwd:md5('#' + this.loginForm.password),
            oldPassword:md5(this.loginForm.username + '#' + this.loginForm.password),
            verifyCode:this.loginForm.codeImg,
            token:this.loginToken
        }
        this.$refs.loginForm.validate(valid => {
        if (valid) {
            this.loading = true
            // controller.login(data).then(res=>{
                this.loading = false
                this.$store.commit('SET_NAME',"admin")
                this.$store.commit('SET_USERID',"120")
                sessionStorage.setItem('login_name',"admin")
                sessionStorage.setItem('userId',"120")
            //     setPermission(JSON.stringify(res.data.pList))  //保存权限列表
                setToken("admin")   //Token
                // sessionStorage.setItem('userInfo',JSON.stringify(res.data))
            //     this.$router.push({ path: this.redirect || '/' })
            // }).catch(error=>{
            //     this.loading = false
            //     this.getCodeImg()
            // })
          sessionStorage.setItem("token", "admin");
          this.$router.push({ path: this.redirect || '/' })
        } else {
        //   this.$message.error('帐号密码错误，请重新输入')
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;
/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        width: 85%;
        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            color: $light_gray;
            &:-webkit-autofill {
                -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
  }
  .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 0px 5px 0px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .code{
    position:absolute;
    top:1%;
    right:0;
    width: 100px;
    height:98%;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .login_footer{
    text-align:center;
  }
  .login_footer,.login_footer .el-button--text{
    color:#f9f9f9;
  }
}
</style>
