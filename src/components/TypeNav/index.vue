<template>
    <div class="type-nav">
        <div class="container">
            <!-- 通过事件的委派，将导航条的高亮效果扩大到上方栏 -->
            <div @mouseleave="currentIndex=-1">
                <h2 class="all">全部商品分类</h2>
                <div class="sort">
                    <!-- 路由的转跳事件也通过事件的委派至共同父元素，这样可以只生成一个点击事件，优化效率 -->
                    <div class="all-sort-list2" @click="goSearch">
                        <!-- 一级目录 -->
                        <div class="item " v-for="(c1, index) in categoryList" :key="c1.categoryId"
                            :class="{ cur: currentIndex === index }">
                            <!-- 设置鼠标进入事件背景颜色的改变 -->
                            <h3 @mouseenter="highLight(index)">
                                <a 
                                :data-categoryName="c1.categoryName"
                                :data-category1Id="c1.categoryId"
                                >{{ c1.categoryName }}</a>
                            </h3>
                            <!-- 二三级商品分类也通过currentIndex的值来控制显示与否 -->
                            <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                                <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                    <dl class="fore">
                                        <dt>
                                            <a 
                                            :data-categoryName="c2.categoryName"
                                            :data-category2Id="c2.categoryId"
                                            >{{ c2.categoryName }}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                <a 
                                                :data-categoryName="c3.categoryName" 
                                                :data-category3Id="c3.categoryId" 
                                                >{{ c3.categoryName }}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>

        </div>
    </div>
</template>
    
<script>
import { mapState } from 'vuex'
//引入节流 
// import _ from 'lodash';全部引入
import throttle from 'lodash/throttle' 

export default {
    name: 'TypeNav',

    data() {
        return {
            //通过当前索引和元素自身索引是否相同来控制背景高亮
            currentIndex: -1,
        }
    },

    //请求完毕没有报错，就向vuex要数据
    computed: {
        ...mapState('home', ['categoryList'])
    },

    //组件挂载完就去向vuex请求数据，在vuex中的actions中再去发送ajax请求
    mounted() {
        this.$store.dispatch('home/categoryList')
    },

    methods: {
        //三级联通的节流操作
        highLight:throttle(function(index){
            this.currentIndex = index
        },50),

        //搜索路由的跳转，还需要携带相关的参数
        goSearch(event){
            //有以下自定义属性的元素即为目标点击对象
            let{categoryname,category1id,category2id,category3id} = event.target.dataset
            
            //确认是目标元素，才会在地址栏中携带相应的信息进行路由转跳，随后在search组件挂载的时候再通过信息去发送ajax请求
            if(categoryname){
                //基础转跳信息：
                let location ={name:'Search'}
                let query={categoryName:categoryname}

                //识别是几级目录,添加不同的id属性
                if(category1id){
                    query.category1Id = category1id
                }else if(category2id){
                    query.category2Id = category2id
                }else{
                    query.category3Id = category3id
                }

                //汇总信息，并转跳
                location.query = query
                this.$router.push(location)
            }
        }
    }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                    // 使用js去动态显示
                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                .cur {
                    background-color: skyblue;
                }
            }
        }
    }
}
</style>