//引入路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
//二级组件引入
import SingleOrder from '@/pages/Center/SingleOrder'
import GroupOrder from '@/pages/Center/GroupOrder'


export default [
    {
        path:'/center',
        component:Center,
        meta:{showFooter:true},
        children:[
            {
                path:'singleorder',
                component:SingleOrder
            },
            {
                path:'grouporder',
                component:GroupOrder
            },
            // 默认转跳
            {
                path:'/center',
                redirect:'/center/singleorder'
            }
        ]
    },
    {
        path:'/paysuccess',
        component:PaySuccess,
        meta:{showFooter:true}
    },
    {
        path:'/pay',
        component:Pay,
        meta:{showFooter:true}
    },
    {
        path:'/trade',
        component:Trade,
        meta:{showFooter:true}
    },
    {
        path:'/shopcart',
        name:'ShopCart',
        component:ShopCart,
        meta:{showFooter:true}
    },
    {
        path:'/addcartsuccess',
        name:'addcartsuccess',
        component:AddCartSuccess,
        meta:{showFooter:true}
    },
    {
        path:'/detail/:skuId',
        component:Detail,
        meta:{showFooter:true}
    },
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