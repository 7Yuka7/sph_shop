<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{orderInfo.orderId}}</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{orderInfo.totalFee}}</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>

            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="open">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//引入二维码生成库
  import QRcode from 'qrcode'
  export default {
    name: 'Pay',
    data(){
      return{
        orderInfo:{},
        //查询支付状态的定时器
        timer:null,
        //支付状态码
        code:''
      }
    },
    methods:{
      //获取订单信息
      async getOrderInfo(){
        try {
          //this.$route.query即为携带过来的订单编号
          let result = await this.$API.reqOrderInfo(this.$route.query.orderId)
          //将结果存储到当前组件下
          this.orderInfo = result.data
          console.log(result)
        } catch (error) {
          alert(error.message)
        }
        
      },

      //饿了么组件，点击弹窗--持续查询支付状态(定时发送ajax请求)
      async open(){
        //生成二维码
        let url = await QRcode.toDataURL(this.orderInfo.codeUrl)
        //组件样式配置
        this.$alert(`<img src=${url} /> `,'微信支付',{
          //在此处进行配置项的配置
          dangerouslyUseHTMLString: true,
          //居中效果
          center:true,
          //取消关闭按钮
          showClose:false,
          //显示取消按钮
          showCancelButton:true,
          //按钮文本内容
          cancelButtonText:'支付遇见问题',
          confirmButtonText:'已支付成功',
                    //两个按钮的点击事件
          beforeClose:(type,instance,done) => {
            //type 为点击的类型有cancel|comfirm两种
            //instance为组件实例对象,
            //done是关闭组件的方法--必须要用

            //首先判断点击对象-先处理支付出现问题
            console.log(type)
            if(type ==='cancel'){

              //1.关闭定时器 2.弹窗-联系相关人员 3.关闭弹窗
              clearInterval(this.timer)
              this.timer = null 
              alert('请联系工作人员')
              done()
            }else{
              //用户点击了已支付成功--首先得确认是否成功
              if(this.code === 200){
                //说明已支付成功，清除定时器，转跳页面
                clearInterval(this.timer)
                this.timer = null
                done()
                this.$router.push('/paysuccess')
              }
            }
          },

        })
        //发送请求查询,查询支付状态
        if(!this.timer){
          //没有定时器就开启一个定时器
          this.timer = setInterval(async ()=>{
            //在定时器中不断发送请求，直到返回结果
            let result = await this.$API.reqPaymentStatus(this.orderInfo.orderId)
            console.log(result)
            //如果支付成功
            if(result.code === 200){
              //1.清除定时器 2.将定时器重新赋值为null 3.保存支付成功的code 4.关闭弹窗 5.转跳至下一级路由 //注意，此处用的是本地mock返回的数据
              clearInterval(this.timer)
              this.timer = null 
              this.code = result.code
              this.$msgbox.close()//组件中关闭弹窗的方法
              
              this.$router.push('paysuccess')
            }

          },3000)
        }
      }
    },
    mounted(){
      //挂载就派发请求
      this.getOrderInfo()
    }
  }
</script>

<style lang="less" scoped>
  .pay-main {
    margin-bottom: 20px;

    .pay-container {
      margin: 0 auto;
      width: 1200px;

      a:hover {
        color: #4cb9fc;
      }

      .orange {
        color: #e1251b;
      }

      .money {
        font-size: 18px;
      }

      .zfb {
        color: #e1251b;
        font-weight: 700;
      }

      .checkout-tit {
        padding: 10px;

        .tit-txt {
          font-size: 14px;
          line-height: 21px;

          .success-icon {
            width: 30px;
            height: 30px;
            display: inline-block;
            background: url(./images/icon.png) no-repeat 0 0;
          }

          .success-info {
            padding: 0 8px;
            line-height: 30px;
            vertical-align: top;
          }
        }

        .paymark {
          overflow: hidden;
          line-height: 26px;
          text-indent: 38px;

          .fl {
            float: left;
          }

          .fr {
            float: right;

            .lead {
              margin-bottom: 18px;
              font-size: 15px;
              font-weight: 400;
              line-height: 22.5px;
            }
          }
        }
      }

      .checkout-info {
        padding-left: 25px;
        padding-bottom: 15px;
        margin-bottom: 10px;
        border: 2px solid #e1251b;

        h4 {
          margin: 9px 0;
          font-size: 14px;
          line-height: 21px;
          color: #e1251b;
        }

        ol {
          padding-left: 25px;
          list-style-type: decimal;
          line-height: 24px;
          font-size: 14px;
        }

        ul {
          padding-left: 25px;
          list-style-type: disc;
          line-height: 24px;
          font-size: 14px;
        }
      }

      .checkout-steps {
        border: 1px solid #ddd;
        padding: 25px;

        .hr {
          height: 1px;
          background-color: #ddd;
        }

        .step-tit {
          line-height: 36px;
          margin: 15px 0;
        }

        .step-cont {
          margin: 0 10px 12px 20px;

          ul {
            font-size: 0;

            li {
              margin: 2px;
              display: inline-block;
              padding: 5px 20px;
              border: 1px solid #ddd;
              cursor: pointer;
              line-height: 18px;
            }
          }
        }
      }

      .submit {
        text-align: center;

        .btn {
          display: inline-block;
          padding: 15px 45px;
          margin: 15px 0 10px;
          font: 18px "微软雅黑";
          font-weight: 700;
          border-radius: 0;
          background-color: #e1251b;
          border: 1px solid #e1251b;
          color: #fff;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          user-select: none;
          text-decoration: none;
        }
      }
    }
  }
</style>