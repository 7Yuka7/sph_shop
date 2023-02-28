import { reqDeatil } from "@/api";

export default {
    namespaced:true,
    actions:{
        //获取商品数据
        async getItemInfo(context,value){
            //向服务器发送axios请求
              let result = await reqDeatil(value)
              if(result.code === 200){
                context.commit('GETITEMINFO',result.data)
              }else{
                throw new Error('Failure')
              }
        }
    },
    mutations:{

        GETITEMINFO(state,value){
            state.goodInfo = value
        }

    },
    state:{
        goodInfo:{}
    },
    getters:{
        //空对象是为了保证返回的不是undefined
        categoryView(state){
            return state.goodInfo.categoryView || {}
        },
        skuInfo(state){
            return state.goodInfo.skuInfo || {}
        },
        //返回轮播图图片列表
        skuImageList(state){
            return state.goodInfo.skuInfo.skuImageList || []
        },
        //返回选择商品属性
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList
        }
    }
}