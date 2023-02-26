import {reqSearch} from '@/api'

//search模块的vuex
export default {
    namespaced:true,
    
    actions:{
        //默认传入的就是空对象，至少为空对象才会返回值
        async getSearchData(context,value={}){
            try{
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

    getters:{

    }
}