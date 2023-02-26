import Vue from 'vue';
import VueRouter from 'vue-router';

//引入路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
//使用插件
Vue.use(VueRouter)

//重写push和replace方法--解决反复点击搜索框报错
//本质就是对原有方法的包装

//先将原有的方法保存一下,随后重写
let orginPush = VueRouter.prototype.push
//原有方法就需要传递三个参数，后两个可不传
VueRouter.prototype.push = function(location,resolve,reject){
    //如果穿了后两个参数，可以直接调用原来的方法
    if(resolve && reject){
        //但是要注意this的问题，因此需要用call或者apply或者bind绑定
        orginPush.call(this,location,resolve,reject)
    }else{
        //没传后两个参数，就在这里加一个
        orginPush.call(this,location,()=>{},()=>{})
    }
}

//重写replace方法
let orginReplace = VueRouter.prototype.replace

VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve &&reject){
        orginReplace.call(this,location,resolve,reject)
    }else{
        orginReplace.call(this,location,()=>{},()=>{})
    }
}
//配置路由
const router = new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home,
            meta:{showFooter:true}
        },
        {
            path:'/login',
            component:Login,
        },
        {
            name:'Search',
            path:'/search/:keyword?',
            component:Search,
            meta:{showFooter:true}
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