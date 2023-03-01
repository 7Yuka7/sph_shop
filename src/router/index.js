import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

//使用插件
Vue.use(VueRouter)

//引入仓库
import store from '@/store'

//重写push和replace方法--解决反复点击搜索框报错
//本质就是对原有方法的包装

//先将原有的方法保存一下,随后重写
let orginPush = VueRouter.prototype.push
//原有方法就需要传递三个参数，后两个可不传
VueRouter.prototype.push = function (location, resolve, reject) {
    //如果穿了后两个参数，可以直接调用原来的方法
    if (resolve && reject) {
        //但是要注意this的问题，因此需要用call或者apply或者bind绑定
        orginPush.call(this, location, resolve, reject)
    } else {
        //没传后两个参数，就在这里加一个
        orginPush.call(this, location, () => { }, () => { })
    }
}

//重写replace方法
let orginReplace = VueRouter.prototype.replace

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        orginReplace.call(this, location, resolve, reject)
    } else {
        orginReplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
const router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

//此处可以设置路由守卫
//在路由跳转之前进行判断
router.beforeEach(async (to,from,next)=>{
    // 数据都从仓库中取，因此要引入store
    // 检查token判断用户是否登录
    let token = store.state.registerAndLogin.token
    //是否已携带用户信息--注意，此处不能直接判断userInfo，因为空对象的布尔值也是true
    let name = store.state.registerAndLogin.userInfo.name

    //逻辑判断开始
    if(token){
        // 已登录
        //1.已登录无法再对登录页面进行访问
        if(to.path === '/login' || to.path === '/register'){
            //已登录访问/login
            next('/home')//直接返回home
        }else{
            //已登录访问其他
            //2.查询是否有userInfo --> 保持信息能被带到每一个组件中
            if(name){
                //已登录有用户信息
                next()
            }else{
                //已登录没有用户信息--需要重新派发
                try {
                    await store.dispatch('registerAndLogin/getUserInfo')
                    next()//派发取得数据，就放行
                } catch (error) {
                    //派发请求失败--说明token过期，清除相应信息，重新登录
                    store.dispatch('registerAndLogin/logOut')
                    next('/login')
                }
                
            }
        }
    }else{
        // 进入此处说明未登录 -- 游客身份
        next()
    }
})


//导出路由
export default router