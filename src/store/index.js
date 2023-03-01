import Vue from "vue";
import Vuex from 'vuex';
//引入不同模块
import home from './home'
import search from "./search";
import detail from "./detail";
import shopCart from "./shopCart";
import registerAndLogin from "./registerAndLogin";

//使用vuex插件
Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopCart,
        registerAndLogin
    }
})