import { reqShopCart,reqDeleteCartItem } from "@/api";

export default {
    namespaced:true,

    actions:{
        //获取购物车数据
        async getShopCart({commit},value){
            let result = await reqShopCart()
            if(result.code ===200){
                commit("GETSHOPCART",result.data)
            }else{
                return Promise.reject(new Error('failure'))
            }
        },
        //删除购物车商品
        async deleteCartShop({commit},value){
            let result = await reqDeleteCartItem(value)
            if(result.code === 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('failure'))
            }
        }
    },
    mutations:{
        GETSHOPCART(state,value){
            state.cartList= value
        }
    },
    state:{
        cartList:[]
    },
    getters:{
        //这个数据结构恶心死了
        cartList(state){
            return state.cartList[0] || {}
        },
        // cartInfoList(state){
        //     return state
        // }
    }
}