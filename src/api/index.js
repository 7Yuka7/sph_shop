//对所有的api接口进行统一管理

import requests from "./request";
import mockRequests from './mockRequest'

//三级联动接口
//按需引入，调用方法就能够向代理服务器发送请求
export const reqCategoryList = () =>{
    
    //返回响应体
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

//使用本地的mock返回数据
//banner接口
export const reqBannderList = () =>{

    return mockRequests({
        url:'/banner',
        method:'get'
    })
}

//floor接口
export const reqFloorList = () =>{

    return mockRequests({
        url:'/floor',
        method:'get'
    })
}