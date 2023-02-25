import axios from 'axios';

//生成axios实例对象，并进行默认配置
const requests = axios.create({
    baseURL:'/api',
    //5s未响应就取消请求
    timeout:5000
})


//设置请求拦截器，在请求发出去之间进行加工
requests.interceptors.request.use((config)=>{
    
    //交出经过配置的请求体
    return config;
})

//设置响应拦截器，对返回响应进行操作
requests.interceptors.response.use(
    (res)=>{

        //处理完数据后交出数据
        return res.data;
    },(err)=>{
        //响应失败的回调函数
        return Promise.reject(new Error('failure'))
    }
    )

//对外暴露
export default requests;