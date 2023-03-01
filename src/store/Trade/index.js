import { reqAddressInfo,reqTradeInfo } from "@/api"

export default {
    namespaced:true,
    actions:{
        //获取用户地址
        async getAddressInfo({commit},value){
            let result = await reqAddressInfo()
            // console.log(result)
            if(result.code === 200){
                commit('GETADDRESSINFO',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('获取用户地址失败'))
            }
        },

        //获取订单交易页信息
        async getTradeInfo({commit},value){
            let result = await reqTradeInfo()
            // console.log(result)
            if(result.code === 200){
                commit('GETTRADEINFO',result.data)
                return 'ok'
            }else{
                return Promise.reject(new Error('获取订单信息失败'))
            }
        }
    },
    mutations:{
        GETADDRESSINFO(state,value){
            state.addressInfo = value
        },
        GETTRADEINFO(state,value){
            state.tradeInfo = value
        }
    },
    state:{
        addressInfo:[],
        tradeInfo:{}
    },
    getters:{

    },
}