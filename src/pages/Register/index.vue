<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <!-- 验证版本--主要就是注意正则式和name的改变 -->
        <input type="text" placeholder="请输入你的手机号" v-model="phone" name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }" :class="{ invalid: errors.has('phone') }" />
        <span class="error-msg">{{ errors.first('phone') }}</span>
        <!-- <input type="text" placeholder="请输入你的手机号" v-model="phone"> -->
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入你的验证码" v-model="codeLocal" name="code"
          v-validate="{ required: true, regex: /^\d{6}$/ }" :class="{ invalid: errors.has('code') }" />
        <button style="width:100px;height:38px;marginLeft:5px" @click="getCode(phone)">发送验证码</button>
        <span class="error-msg">{{ errors.first('code') }}</span>
      </div>

      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的密码" v-model="password" name="password"
          v-validate="{ required: true, regex: /[a-zA-Z0-9]{8,16}/ }" :class="{ invalid: errors.has('password') }" />
        <span class="error-msg">{{ errors.first('password') }}</span>
      </div>

      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="确认密码" v-model="passwordCheck" name="passwordCheck"
          v-validate="{ required: true, is: password }" :class="{ invalid: errors.has('passwordCheck') }" />
        <span class="error-msg">{{ errors.first('passwordCheck') }}</span>
      </div>

      <div class="controls">
        <input type="checkbox" v-model="boxCheck" name="agree" v-validate="{ required: true, 'agree': true }"
          :class="{ invalid: errors.has('agree') }" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first('agree') }}</span>
      </div>
      <!-- 点击完成注册1.向服务器发送注册数据 2.转跳页面 -->
      <div class="btn" @click="registerOperate">
        <button>完成注册</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Register',
  data() {
    return {
      phone: '',
      codeLocal: '',
      password: '',
      passwordCheck: '',
      boxCheck: true
    }
  },
  computed: {
    ...mapState('registerAndLogin', ['code'])
  },
  methods: {
    //获取验证码
    async getCode() {
      try {
        //首先phone不能为空
        this.phone && await this.$store.dispatch('registerAndLogin/getCode', this.phone)
        //生成后直接键入
        this.codeLocal = this.code
      } catch (error) {
        alert(error.message)
      }
    },

    //注册
    async registerOperate() {
      //验证全通过为true
      const success = await this.$validator.validateAll()
      if (success) {
        try {
          // 简单判断-当有值、重复输入密码相同且勾选了协议后再派发请求
          (this.phone && this.code && this.password === this.passwordCheck && this.boxCheck) && await this.$store.dispatch('registerAndLogin/Register', { phone: this.phone, code: this.code, password: this.password })
          //当返回没错时，进行转跳
          this.$router.push('/login')
        } catch (error) {
          alert(error.message)
        }
      }


    }
  }
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}</style>