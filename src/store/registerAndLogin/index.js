import { reqGetCode,reqRegister,reqLogin,reqUserInfo,reqLogOut } from "@/api";
import { getToken,setToken,removeToken } from "@/utils/token";

export default {
    namespaced:true,
    actions:{

        //获取验证码，此处因为是练习所以需要后续的commit操作，正常开发不应该
        async getCode({commit},phone){
            let result = await reqGetCode(phone)
            if(result.code ===200){
                commit('GETCODE',result.data)
            }else{
                return Promise.reject(new Error('请求验证码错误'))
            } 
        },

        //将用户的注册信息发送至服务器
        async Register({commit},userInfo){
            let result = await reqRegister(userInfo)
            if(result.code === 200){
                return 'ok'
            }else{
                return Promise.reject(new Error('注册失败'))
            }
        },

        //用户登录
        async Login({commit},userPrompt){
            let result = await reqLogin(userPrompt)
            if(result.code === 200){
                //将token存储到仓库以及本地存储中
                setToken(result.data.token)
                commit('LOGIN',result.data.token)
                return 'ok'
            }else{
                return Promise.reject(new Error('登录失败'))
            }
        },

        //获取用户登录信息
        async getUserInfo({commit},value){
            let result = await reqUserInfo()
            if(result.code === 200){
                commit('GETUSERINFO',result.data)
            }else{
                return Promise.reject(new Error('获取信息失败'))
            }
        },

        //退出登录
        async logOut({commit},value){
            let result = await reqLogOut()
            if(result.code === 200){
                //退出成功，去mutations中删除数据
                commit('LOGOUT')
                return 'ok'
            }else{
                return Promise.reject(new Error('登出失败'))
            }
        },
    },
    mutations:{
        GETCODE(state,value){
            state.code = value
        },
        LOGIN(state,value){
            state.token = value
        },
        GETUSERINFO(state,value){
            state.userInfo = value
        },
        LOGOUT(state,value){
            //清除仓库数据：
            state.token = {}
            state.userInfo = {}
            //清除本地数据--模块化编程
            removeToken()
        }
    },
    state:{
        code:'',
        // 初始值为none，在写入之后仓库中的token就变为具体的值
        //因此无论如何刷新，只要token不失效，就有用
        token:getToken(),
        userInfo:{}
    },
    getters:{

    }
}