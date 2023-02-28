import { reqShopCart } from "@/api";

export default {
    namespaced:true,
    
    actions:{
        async getShopCart({commit},value){
            let result = await reqShopCart()
            if(result.code ===200){
                commit("GETSHOPCART",result.data)
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