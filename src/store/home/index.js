//注意是分别引入
import {reqCategoryList,reqBannderList,reqFloorList} from '@/api'

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

        //banner区域的数据请求
        async bannerList(context,value){
            let result = await reqBannderList()
            if(result.code === 200){
                context.commit('BANNERLIST',result.data)
            }else{
                throw new Error('Failure')
            }
        },

        //floor区域的数据请求
        async floorList(context,value){
            let result = await reqFloorList()
            if(result.code ===200){
                context.commit('FLOORLIST',result.data)
            }else{
                throw new Error('Failure')
            }
        }

    },

    mutations:{
        CATEGORYLIST(state,value){
            state.categoryList = value.slice(0,16)
        },
        BANNERLIST(state,value){
            state.bannerList = value
        },
        FLOORLIST(state,value){
            state.floorList = value
        }
    },

    state:{
        //返回data是数组形式，此处的初始值也需要为数组形式
        categoryList:[],

        bannerList:[],

        floorList:[]
    },

    getters:{

    }
}