<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <!-- 购物车区域 -->
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <!-- 改变商品的勾选状态 -->
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked===1" @change="changeChecked(item,$event)">
          </li>

          <li class="cart-list-con2">
            <img :src="item.imgUrl">
            <div class="item-msg">{{item.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{item.cartPrice}}</span>
          </li>
          <!-- 修改商品数量 -->
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeNum('minus',-1,item)">-</a>
            <!-- 第二个参数直接乘以1转换成数字 -->
            <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="item.skuNum" @change="changeNum('change',$event.target.value*1,item)">
            <a href="javascript:void(0)" class="plus" @click="changeNum('plus',1,item)">+</a>
          </li>

          <li class="cart-list-con6">
            <span class="sum">{{item.cartPrice * item.skuNum}}</span>
          </li>
          <!-- 删除商品 -->
          <li class="cart-list-con7">
            <a href="javascript:;" class="sindelet" @click="removeItem(item)">删除</a>
            <br>
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 全选按钮事件,且若数组没有数据全选按钮也取消 -->
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @click="changeAllChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <!-- 删除按钮事件 -->
        <a href="javascript:;" @click="removeAllChecked">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import throttle from 'lodash/throttle';
  export default {
    name: 'ShopCart',
    methods:{
      getData(){
        //请求数据
        this.$store.dispatch('shopCart/getShopCart')
      },

      //处理购物车商品加减--节流
      changeNum:throttle(function(type,disNum,item){
        console.log(type,disNum,item)
        switch(type){
          //减法
          case 'minus':
          //防止出现负数
          disNum = item.skuNum>1? -1:0
            break
          // 加法
          case 'plus':
            disNum = 1
            break
          // 改变input
          case 'change':
            //如果用户输入的是非数字
            if(isNaN(disNum)){
              disNum = 0
            }else{
              //这里要返回的是插值
              disNum = disNum - item.skuNum
            }
            break
        }
        //最后向服务器返回修改的数据
        this.$store.dispatch('detail/addOrModifyCart',{skuId:item.skuId,skuNum:disNum})
        //刷新页面
        this.getData()
      },100),
      
      //删除购物车中的商品
      async removeItem(cart){
        try {
          //发送带有id的请求即可
          await this.$store.dispatch('shopCart/deleteCartShop',cart.skuId)
          //还需要刷新页面
          this.getData()//这会放入微任务队列中
        } catch (error) {
          alert(error.message)
        }
      },

      //修改商品的checked
      async changeChecked(cart,event){
        //派发
        try {
          await this.$store.dispatch('shopCart/modifyChecked',{skuID:cart.skuId,isChecked:event.target.checked?'1':'0'})
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },

      //删除所有的商品--由于不再v-for中，因此不能拿到相关选中的信息，因此直接去仓库中执行逻辑
      async removeAllChecked(){
        try {
          //等待结果返回，如果没报错就会重载页面
          await this.$store.dispatch('shopCart/removeAllChecked')
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },

      //商品的全选与全不选--传入的是当前全选按钮是勾选状态与否
      async changeAllChecked(event){
        try {
          await this.$store.dispatch('shopCart/changeAllChecked',event.target.checked)
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      }
    },
    computed:{
      ...mapGetters('shopCart',['cartList']),

      //真正的购物车数据--这个结构嵌套层次太多
      cartInfoList(){
        return this.cartList.cartInfoList
      },

      //总共商品价格--未变
      totalPrice(){
        let sum = 0
        this.cartInfoList.forEach((item)=>{
           sum+=(item.cartPrice*item.skuNum)
        })
        return sum
      },
      //是否已全选
      isAllChecked(){
        let flag = this.cartInfoList.every((item) => {
          return item.isChecked === 1
        })
        return flag
      },
      
    },
    mounted(){
      //挂载的时候就向服务器请求购物车数据
      this.getData()
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>