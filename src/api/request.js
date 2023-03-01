import axios from 'axios';

//引入进度条及其样式
import nprocess from 'nprogress';
import 'nprogress/nprogress.css';

//引入仓库
import store from '@/store'

//生成axios实例对象，并进行默认配置
const requests = axios.create({
    baseURL:'/api',
    //5s未响应就取消请求
    timeout:5000
})


//设置请求拦截器，在请求发出去之间进行加工
requests.interceptors.request.use((config)=>{
    //进度条启动
    nprocess.start()

    //设置请求头-游客的uuid
    if(store.state.detail.uuid_token){
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //如果带有token，则在请求头中加入
    if(store.state.registerAndLogin.token){
        config.headers.token = store.state.registerAndLogin.token
    }
    //交出经过配置的请求体
    return config;
})

//设置响应拦截器，对返回响应进行操作
requests.interceptors.response.use(
    (res)=>{
        
        //请求条结束
        nprocess.done()
        //处理完数据后交出数据
        return res.data;
    },(err)=>{
        //响应失败的回调函数
        return Promise.reject(new Error('failure'))
    }
    )

//对外暴露
export default requests;