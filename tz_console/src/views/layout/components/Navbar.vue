<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb/>
    <!-- <p class="login_account">帐号：<em>{{ name }}</em></p> -->
    <el-dropdown class="avatar-container" trigger="click" size="medium">
      <div class="avatar-wrapper">
        <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" class="user-avatar"> -->
        <img :src="logo" class="user-avatar">
        <i class="el-icon-caret-bottom"/>
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item>{{ name }}</el-dropdown-item>
        <el-dropdown-item divided>
          <span style="display:block;" @click="logout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { getToken, setToken, removeToken,removePermission } from '@/utils/auth'
import controller from "@/controllers/logincontrollers";
import logo from "@/assets/avatar_default.png"

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data(){
    return {
        logo:logo,
        loginName:sessionStorage.getItem('login_name')
    }
  },
  computed: {
    ...mapGetters(["sidebar", "avatar","name"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
        this.$confirm("确定退出登录？", "提示", {
			confirmButtonText: "确定",
			cancelButtonText: "取消",
			type: "warning"
		}).then(()=>{
			controller.logout().then(res => {
                removeToken()
                removePermission()
                sessionStorage.removeItem('login_name')
                sessionStorage.removeItem('userId')
                sessionStorage.removeItem('userInfo')
                this.$message.success('退出登录成功')
                setTimeout(() => { location.reload() },1000)// 为了重新实例化vue-router对象 避免bug
            }).catch(err => {
                this.$message.error("后台服务错误");
            })
		}).catch(() => {});
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .login_account{
    position: absolute;
    top:0;
    right: 120px;
    height:50px;
    line-height: 50px;
    font-size: 15px;
    color:#444;
    font-weight: normal;
    margin:0;
    em{
      font-size: 14px;
    }
  }
  
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
        width:40px;
        height:40px;
        border-radius: 50%;
        font-size: 0px;
        background: #181d20;
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        line-height: initial;
        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .el-icon-caret-bottom {
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
        }
    }
  }
}
</style>

