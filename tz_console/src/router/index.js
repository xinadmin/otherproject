import Vue from 'vue'
import Router from 'vue-router'

// import institution from './modules/institution'
// import apothecary from './modules/apothecary'
// import system from './modules/system'
// import doctor from './modules/doctor'
// import diagnosis from './modules/diagnosis'
// import patient from './modules/patient'
// import videoManage from './modules/videoManage'
// import hospital from './modules/hospital'
import contract from './modules/contract'
// import sensitive from './modules/sensitive'
//
// import systemSet from './modules/systemSet'
// import dataAnalyse from './modules/dataAnalyse'
// import homePage from './modules/homePage'

// import video from './modules/video'
const Template = resolve => { require(['@/views/layout/template'], resolve) }

// 合同管理
const Contract = resolve => { require(['@/views/contract/index'], resolve) }
const Create = resolve => { require(['@/views/contract/create'], resolve) }
Vue.use(Router)

/* Layout */
const Layout = resolve => {
  require(['@/views/layout/Layout'], resolve)
}

/**
 * Lazy Loading Routes
 */

/* Login */
const Login = resolve => {
  require(['@/views/login/index'], resolve)
}

/* Dashboard */
const Dashboard = resolve => {
  require(['@/views/dashboard/index'], resolve)
}

/* 404 */
const NotFound = resolve => {
  require(['@/views/404'], resolve)
}

/* 默认路由 */
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: NotFound, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
    }]
  },
  {
    path: '/soa',
    component: Layout,
    redirect: { name:'Template' },
    alwaysShow:true,
    meta: { title: '康越合同管理', icon: 'table',permission:{ pCheck:1,pId:'2000001'}},
    children: [
      {
        path:'/soa/',
        component:Template,
        redirect: { name:'Contract' },
        meta: { title: '康越共享空间合同', icon: '', noCache: true, affix: false,permission:{ pCheck:1,pId:'2000002' } },
        children: [
          {
            path:'contract',
            name:'Contract',
            hidden:true,
            component:Contract,
            meta: { title: '合同列表', icon: '', noCache: true, affix: false }
          },
          {
            path:'create',
            name:'Create',
            hidden:true,
            component:Create,
            meta: { title: '创建合同', icon: '', noCache: true, affix: false }
          }
        ]
      }

    ]
  }

  // ...contract
  // ...video,
]

/* 异步路由 */
// export const asyncRouterMap = [
//   ...institution,
//   ...doctor,
//   ...apothecary,
//   ...videoManage,
//   ...diagnosis,
//   ...patient,
//   ...hospital,
//   ...contract,
//   ...sensitive,
//   ...system,
//   ...systemSet,
//   ...dataAnalyse,
//   ...homePage,
//   { path: '*', redirect: '/404', hidden: true }
//
// ]
export default new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
