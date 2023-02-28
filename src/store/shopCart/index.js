import { reqShopCart } from "@/api";

export default {
    namespaced:true,
    actions:{
        async getShopCart(){
            let result = await reqShopCart()
            console.log(result)
        }
    },
    mutations:{

    },
    state:{

    },
    getters:{

    }
}