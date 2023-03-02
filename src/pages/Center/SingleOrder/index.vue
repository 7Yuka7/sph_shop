<template>
    <div class="order-right">
        <div class="order-content">
            <div class="title">
                <h3>我的订单</h3>
            </div>
            <div class="chosetype">
                <table>
                    <thead>
                        <tr>
                            <th width="29%">商品</th>
                            <th width="31%">订单详情</th>
                            <th width="13%">收货人</th>
                            <th>金额</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                </table>
            </div>
            <!-- 订单信息 -->
            <div class="orders">

                <table class="order-item" v-for="item in orderList.records" :key="item.id">
                    <thead>
                        <tr>
                            <th colspan="5">
                                <span class="ordertitle">{{item.createTime}}　订单编号：{{item.outTradeNo}} <span
                                        class="pull-right delete"><img src="../images/delete.png"></span></span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(cart,index) in item.orderDetailList" :key="cart.id">
                            <td width="60%">
                                <div class="typographic">
                                    <img :src="cart.imgUrl" style="weight:100px;height:100px">
                                    <a href="#" class="block-text">{{cart.skuName}}</a>
                                    <span>{{cart.skuNum}}</span>
                                    <a href="#" class="service">售后申请</a>
                                </div>
                            </td>
                            <!-- 后面的统一展示一个即可，且跨越宽度就是一个订单内的商品数 -->
                            <td :rowspan="orderList.records.length" width="8%" class="center" v-if="index === 0">{{item.consignee}}</td>
                            <td :rowspan="orderList.records.length" width="13%" class="center" v-if="index === 0">
                                <ul class="unstyled">
                                    <li>总金额{{item.totalAmount}}</li>
                                    <li>在线支付</li>

                                </ul>
                            </td>
                            <td :rowspan="orderList.records.length" width="8%" class="center" v-if="index === 0">
                                <a href="#" class="btn">{{item.processStatus}} </a>
                            </td>
                            <td :rowspan="orderList.records.length" width="13%" class="center" v-if="index === 0">
                                <ul class="unstyled">
                                    <li>
                                        <a href="mycomment.html" target="_blank">评价|晒单</a>
                                    </li>

                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            <!-- 分页器 -->
            <Pagination :pageNo="page*1" :pageSize="limit*1" :total="orderList.total*1" :continues="5" @getPage="getPage"/>
        </div>
        <!--猜你喜欢-->
        <div class="like">
            <h4 class="kt">猜你喜欢</h4>
            <ul class="like-list">
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike01.png" />
                    </div>
                    <div class="attr">
                        <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>3699.00</i>
                    </div>
                    <div class="commit">已有6人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike02.png" />
                    </div>
                    <div class="attr">
                        Apple苹果iPhone 6s/6s Plus 16G 64G 128G
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4388.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike03.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
                <li class="likeItem">
                    <div class="p-img">
                        <img src="../images/itemlike04.png" />
                    </div>
                    <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
                    </div>
                    <div class="price">
                        <em>¥</em>
                        <i>4088.00</i>
                    </div>
                    <div class="commit">已有700人评价
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>    
    export default {
        name:'SingleOrder',
        data(){
            return {
                // 当前页码
                page:'1',
                //每页显示订单数
                limit:'3',
                orderList:{}
            }
        },
        methods:{
            //发送订单请求
            async getData(){
                let result = await this.$API.reqOrderList(this.page,this.limit)
                console.log(result)
                if(result.code === 200){
                    //将返回的数据存在组件中
                    this.orderList = result.data
                }else{
                    alert('获取订单列表失败')
                }
            },
            //分页器改变页数
            getPage(page){
                this.page = page
                //修改页面后还需要重新发送请求
                this.getData()
            }
        },
        mounted(){
            this.getData()
        }
    }
</script>

<style></style>