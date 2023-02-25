import Vue from 'vue';
import VueRouter from 'vue-router';

//引入路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
//使用插件
Vue.use(VueRouter)

//配置路由
const router = new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/search',
            component:Search
        },
        {
            path:'/register',
            component:Register
        },
        //默认路由,访问/就重新定向到/home
        {
            path:'/',
            redirect:'/home'
        }
    ]
})

//此处可以设置路由守卫

//导出路由
export default router