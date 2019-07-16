<template>
    <div class="dashboard-container">
        <!-- <img :src='bgImg' alt="message_image"> -->
        <p class="welcome">你好,{{ loginname }},欢迎来到{{ siteName || '智慧管理后台' }}！</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import bgImg from '@/assets/bg1.png'

export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters([
        'name',
        'roles'
        ]),
        siteName(){
            const name = JSON.parse(sessionStorage.getItem('userInfo')).storeName
            if(name!=='' || name!==null){
                return name
            }
        }
    },
    data() {
        return {
            bgImg:bgImg,
            loginname:sessionStorage.getItem('login_name')
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
    &-container {
        // min-height:200px;
        max-height: calc(100vh - 86px);
        font-size:0px;
        text-align: left;
        // background-color: #fff;
        img{
            max-width:100%;
            max-height:100%;
        }
        .welcome{
            margin:0;
            padding:20px 17px;
            font-size: 18px;
            color:#444;
        }
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
