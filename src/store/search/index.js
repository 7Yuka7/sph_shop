import {reqSearch} from '@/api'

//search模块的vuex
export default {
    namespaced:true,
    
    actions:{
        //默认传入的就是空对象，至少为空对象才会返回值，默认值即为空对象
        async getSearchData(context,value={}){
            try{
                //发送请求使用await直接返回结果而不是Promise对象
                let result = await reqSearch(value)
                if(result.code === 200){
                    context.commit('GETSEARCHDATA',result.data)
                }
            }
            catch(e){
                console.log(e)
            }
            
        }
    },

    mutations:{
        GETSEARCHDATA(state,value){
            state.searchData = value
        }
    },

    state:{
        searchData:{}
    },
    //使用getters简化取数据的流程//此处虽然没必要，但还是使用getter方法取数据
    getters:{
        goodsList(state){
            return state.searchData.goodsList
        },
        attrsList(state){
            return state.searchData.attrsList
        },
        trademarkList(state){
            return state.searchData.trademarkList
        },
        total(state){
            return state.searchData.total
        }
    }
}