import { reqDeatil } from "@/api";
import { reqAddOrModifyCart } from "@/api";
// 引入生成随机一个字符串作为游客的标识
import {getUUID} from '@/utils/uuid_token'

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
        },

        //添加或修改购物车数据 -- 已直接对传入的参数解构赋值
        async addOrModifyCart({commit},{skuId,skuNum}){
            let result = await reqAddOrModifyCart(skuId,skuNum)
            if(result.code ===200){
                return 'ok'
            }else{
                //响应失败抛出错误
                return Promise.reject(new Error('请求失败'))
            }
            
        }
    },
    mutations:{

        GETITEMINFO(state,value){
            state.goodInfo = value
        }

    },
    state:{
        goodInfo:{},

        //身份：
        uuid_token:getUUID()
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