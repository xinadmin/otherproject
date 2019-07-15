<template>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <transition name="fade-transform">
        <div class="menu_title" v-show="titleShow">
          <span>{{ siteName || '智慧管理后台' }}</span>
          <!-- <span class="pro_title">管理后台</span> -->
        </div>
      </transition>
      <el-menu
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path"/>
      </el-menu>
    </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data(){
    return {

    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    titleShow(){
      return this.sidebar.opened
    },
    siteName(){
        // const name = JSON.parse(sessionStorage.getItem('userInfo')).storeName
      const name = "admin";

      if(name!=='' || name!==null){
            return name
        }
    }
  }
}
</script>

<style lang="scss" scope>
.sidebar-container{
  position: relative;
  background-color: #333;
  padding-top:84px;
}
  .menu_title{
    position: fixed;
    top:0;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    font-size: 16px;
    color:#AAAAAA;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:200px;
    height:84px;
    line-height: 24px;
    background: #333333;
    user-select: none;
    .pro_title{
      font-family:cursive;
      font-size:14px;
    }
  }
  .fade-transform-enter-active, .fade-transform-leave-active{
    transition:800ms all ease;
  }
  .fade-transform-enter, .fade-transform-leave-to{
    transition-duration: 0ms;
  }
</style>
