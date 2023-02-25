import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from '@/router'

//全局组件引入区域
import TypeNav from '@/pages/Home/TypeNav'

//注册全局组件
Vue.component('TypeNav',TypeNav)

Vue.config.productionTip = false

// //发送ajax请求测试：
// import {reqCategoryList} from '@/api'
// reqCategoryList()

new Vue({
  render: h => h(App),
  //挂载路由
  router
}).$mount('#app')
