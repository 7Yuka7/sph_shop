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

//search接口
export const reqSearch = (params)=>{

    return requests({
        url:'/list',
        method:'post',
        data:params
    })
}

//获取商品详情的接口
export const reqDeatil = (skuId)=>{
    return requests({
        url:`/item/${skuId}`,
        method:'get',
    })
}

//添加或改动购物车接口
export const reqAddOrModifyCart = (skuId,skuNum) => {
    return requests({
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
}

//请求购物车数据接口
export const reqShopCart = () =>{
    return requests({
        url:'/cart/cartList',
        method:'get'
    })
}

//删除购物车商品接口
export const reqDeleteCartItem = (skuId) =>{
    return requests({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}