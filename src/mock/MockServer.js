import Mock from 'mockjs'

//引入json数据
import banner from './banner.json'
import floor from './floor.json'

//模拟数据
Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})
Mock.mock('/mock/payment/weixin/queryPayStatus',{code:200,data:null, message: "支付成功",ok: true})

