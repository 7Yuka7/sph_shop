<template>
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p>
                        <span>请</span>
                        <!-- 注册完路由，使用声明式导航跳转路由 -->
                        <router-link to="/login">登录</router-link>
                        <router-link to="/register" class="register">免费注册</router-link>

                        <!-- <a href="###">登录</a>
                        <a href="###" class="register">免费注册</a> -->
                    </p>
                </div>
                <div class="typeList">
                    <a href="###">我的订单</a>
                    <a href="###">我的购物车</a>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <!--头部第二行 搜索区域-->
        <div class="bottom">
            <h1 class="logoArea">
                <!-- 将a标签修改成路由转跳router-link标签 -->
                <router-link to="/home" >
                    <img src="./images/logo.png" alt="">
                </router-link>
                <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
                    <img src="./images/logo.png" alt="">
                </a> -->
            </h1>
            <div class="searchArea">
                <form action="###" class="searchForm">
                    <!-- 使用v-model双向绑定获取输入框 -->
                    <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyWord"/>
                    <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
                </form>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: '',
    data(){
        return{
            keyWord:''
        }
    },
    methods:{
        goSearch(){
            //同样的，此处要检查是否已经有分类导航的query参数，若有，则也需要携带
            let location = {name:'Search'}
            //注意关键词和路由处的占位符的对应
            let params = {keyword:this.keyWord || undefined}
            location.params = params

            if(this.$route.query){
                location.query = this.$route.query
            }
            //整合发送
            console.log(location)
            this.$router.push(location)

            // this.$router.push({
            //     name:'Search',
            //     params:{
            //         keyWords:this.keyWords
            //     }
            // })
        }
    },
    //在组件挂载的时候就加载监听全局事件总线
    mounted(){
        this.$bus.$on('removeKeyword',()=>{
            this.keyWord = ''
        })
    },
    //销毁组件之间取消对该事件的监听
    beforeDestroy(){
        this.$off('removeKeyword')
    }
}
</script>

<style scoped lang="less">
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>