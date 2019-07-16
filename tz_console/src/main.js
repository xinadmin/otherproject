import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// import echarts from 'echarts';
// Vue.prototype.$echarts = echarts;
// import highcharts from 'highcharts';
// import VueHighCharts from 'vue-highcharts';
// import highcharts3d from 'highcharts/highcharts-3d'

// import VueQuillEditor from 'vue-quill-editor'
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// Vue.use(VueQuillEditor)

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

import i18n from './lang'
import { getLocalTime, formatDate, formatDate1, price, licenceInfo } from '@/utils/filters'

import '@/icons' // icon
import '@/permission' // permission control
// import 'jquery' //电子签名，等待移除依赖
// import Print from 'vue-print-nb'
// Vue.use(Print); //打印

Vue.config.productionTip = false

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
// Vue.use(ElementUI)
//token
Vue.prototype.$token = sessionStorage.token || '';
//菜单权限数据
// Vue.prototype.$MenuPermission = [];
// Vue.prototype.$Menu = [];
//供应商认证状态
// Vue.prototype.$CertificationStatus = -1;
//权限提示
// Vue.prototype.$Permission = '';
//用户ID
// Vue.prototype.$supplierName = '';
// Vue.prototype.$accountName = '';

//置入公共过滤器
Vue.filter('formatDate', formatDate);
Vue.filter('getLocalTime', getLocalTime);
Vue.filter('formatDate1', formatDate1);
Vue.filter('price', price);

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  // echarts,
  // VueQuillEditor,
  // highcharts,
  // VueHighCharts,
  // highcharts3d,
  render: h => h(App)
})
