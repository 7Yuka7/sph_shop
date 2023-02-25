//注意是分别引入
import {reqCategoryList} from '@/api'

//home模块的vuex
export default {
    namespaced:true,
    actions:{
        //采用async结合await来直接返回比较干净的数据，result.data即为想要的数据
        async categoryList(context,value){
            //在此处通过ajax发送请求,返回的是一个Promise对象，通过then读取,
            let result = await reqCategoryList().then(r=>r)
            if(result.code === 200){
                //响应成功，通过mutations修改state
                context.commit('CATEGORYLIST',result.data)
            }else{
                //响应失败，报错
                throw new Error('Failure')
            }
        },
    },

    mutations:{
        CATEGORYLIST(state,value){
            state.categoryList = value.slice(0,16)
        }
    },

    state:{
        //返回data是数组形式，此处的初始值也需要为数组形式
        categoryList:[]
    },

    getters:{

    }
}