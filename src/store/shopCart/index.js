import { reqShopCart,reqDeleteCartItem,reqModifyChecked } from "@/api";

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
                return Promise.reject(new Error('删除失败'))
            }
        },

        //改变商品是否勾选
        async modifyChecked({commit},{skuID,isChecked}){
            let result = await reqModifyChecked(skuID,isChecked)
            if(result.code === 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('修改商品勾选状态失败'))
            }
        },

        //删除所有选中商品
        async removeAllChecked({dispatch,getters},value){
            //将所有结果放入一个数组中，最后在组件方法内调用Promise.all()方法来判断成功与否
            let PromiseAll = []
            //遍历目前购物车列表
            getters.cartList.cartInfoList.forEach(item=>{
                let promise = item.isChecked===1? dispatch('deleteCartShop',item.skuId):''
                PromiseAll.push(promise)
            })
            return  Promise.all(PromiseAll)
        },

        //商品的全选与全不选--与商品的删除类似
        async changeAllChecked({dispatch,getters},value){
            let PromiseAll = []
            let promise
            getters.cartList.cartInfoList.forEach(item=>{
                //如果是全选-value==true
                if(value){
                    //ischecked为1则说明已经选择，可以不操作 --操作那些没有选中的 '1'--表示选中
                    promise = item.isChecked===1? '':dispatch('modifyChecked',{skuID:item.skuId,isChecked:'1'})
                    PromiseAll.push(promise)
                }else{
                    //此处即为全不选--还是需要遍历，不过此时找的是那些已选中的 '0'--表示取消选择
                    promise = item.isChecked === 1 ? dispatch('modifyChecked',{skuID:item.skuId,isChecked:'0'}):''
                    PromiseAll.push(promise)
                }
            })

            return Promise.all(PromiseAll)
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
            return state.cartList[0]
        },
        // cartInfoList(state){
        //     return state
        // }
    }
}