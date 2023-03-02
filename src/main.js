import Vue from 'vue'
import App from './App.vue'

//引入路由
import router from '@/router'

//全局组件引入区域
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

//注册全局组件---------------------
Vue.component('TypeNav',TypeNav)//三级联动
Vue.component('Carousel',Carousel)//轮播图
Vue.component('Pagination',Pagination)//分页器


//引入vuex仓库
import store from '@/store'

//引入Mock数据模拟
import '@/mock/MockServer.js'

//引入轮播图需要的css
import 'swiper/css/swiper.css'

//引入饿了么组件，并使用存储在原型对象中
import {MessageBox} from 'element-ui'

//引入图片懒加载-并设置插件
// import VueLazyload from 'vue-lazyload'
// Vue.use(VueLazyload,{
//   loading: '@/assets/loading.gif',
// })

//引入表单验证
import '@/plugins/validate'

Vue.config.productionTip = false

//引入接口，并挂载到Vue原型对象上
import * as API from '@/api'

new Vue({
  render: h => h(App),
  //全局事件总线--以及axios接口请求挂载
  beforeCreate(){
    //全局事件总线
    Vue.prototype.$bus = this
    //路由接口
    Vue.prototype.$API = API
    //饿了么组件
    Vue.prototype.$msgbox = MessageBox;
    Vue.prototype.$alert = MessageBox.alert;
  },
  //挂载路由
  router,
  //挂载仓库
  store,
}).$mount('#app')
