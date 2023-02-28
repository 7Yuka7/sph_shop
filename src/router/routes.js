//引入路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'


export default [
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