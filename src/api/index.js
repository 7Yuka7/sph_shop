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

//商品勾选状态接口
export const reqModifyChecked = (skuID,isChecked) =>{
    return requests({
        url:`/cart/checkCart/${skuID}/${isChecked}`,
        method:'get'
    })
}

//验证码接收路由接口
export const reqGetCode = (phone) => {
    return requests({
        url:`/user/passport/sendCode/${phone}`,
        method:'get'
    })
}

//注册发送数据接口
export const reqRegister = ({phone,password,code}) => {
    return requests({
        url:`/user/passport/register`,
        method:'post',
        data:{phone,password,code}
    })
}

//用户登录接口
export const reqLogin = ({phone,password}) => {
    return requests({
        url:'/user/passport/login',
        method:'post',
        data:{phone,password}
    })
}

//获取用户登录信息接口
export const reqUserInfo = () =>{
    return requests({
        url:'/user/passport/auth/getUserInfo',
        method:'get'
    })
}

//退出登录接口
export const reqLogOut = () => {
    return requests({
        url:'/user/passport/logout',
        method:'get'
    })
}

//获取用户地址信息接口
export const reqAddressInfo = () => {
    return requests({
        url:'/user/userAddress/auth/findUserAddressList',
        method:'get'
    })
}

//获取订单交易页信息接口
export const reqTradeInfo = () => {
    return requests({
        url:'/order/auth/trade',
        method:'get'
    })
}

//提交订单接口
export const reqSubmitOrder = (tradeNo,data) => {
    return requests({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        data
    })
}

//查询订单结果接口
export const reqOrderInfo = (orderId) => {
    return requests({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

//查询订单支付状态
//远程服务器
// export const reqPaymentStatus = (orderId) => {
//     return requests({
//         url:`/payment/weixin/queryPayStatus/${orderId}`,
//         method:'get'
//     })
// }
//本地服务器
export const reqPaymentStatus = (orderId) => {
    return mockRequests({
        url:`/payment/weixin/queryPayStatus`,
        method:'get'
    })
}

//个人中心获取订单信息
export const reqOrderList = (page,limit) => {
    return requests({
        url:`/order/auth/${page}/${limit}`,
        method:'get'
    })
}