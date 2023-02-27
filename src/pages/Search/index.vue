<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 面包屑 -->
          <ul class="fl sui-tag">
            <!-- 判断参数中是否有分类名再动态的展示有无面包屑，后面的x是面包屑的移除事件 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}<i @click="removeBread">×</i>
            </li>
            <!-- 关键词的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(':')[1] }}<i @click="removetrademark">×</i></li>
            <!-- 商品属性的面包屑 -->
            <li class="with-x" v-for="(item,index) in searchParams.props" :key="index">{{ item.split(':')[1]}}<i @click="removeProps(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getTradeMark="getTradeMark" @getGoodsDetail="getGoodsDetail"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">

            <!-- 排序操作 -->
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isActive}" @click="changeSort('1')">
                  <a >综合 <span class="iconfont" :class="{'icon-todown':isDesc,'icon-up':isAsc}" v-show="isActive"></span></a>
                </li>
                <li :class="{active:!isActive}" @click="changeSort('2')">
                  <a >价格 <span class="iconfont" :class="{'icon-todown':isDesc,'icon-up':isAsc}" v-show="!isActive"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href=""><img :src="good.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPage="getPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SearchSelector from './SearchSelector/SearchSelector'


export default {
  name: 'Search',
  data() {
    return {
      //默认发送数据为空，后续根据需要添加
      searchParams: {
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        "categoryName": "",
        "keyword": "",
        "order": "1:desc",
        "pageNo": 1,
        "pageSize": 10,
        "props": [],
        "trademark": ""
      }

    }
  },
  components: { SearchSelector },
  //在挂载之间收集搜索信息--包括三级联通和搜索栏中的query和params参数
  beforeMount() {
    this.searchParams = { ...this.searchParams, ...this.$route.query, ...this.$route.params }
  },
  mounted() {
    //挂载完成的时候就请求数据
    this.getData()
  },
  computed: {
    ...mapGetters('search', ['goodsList','total']),
    //计算上下箭头和active类的显示
    isActive(){
      return this.searchParams.order.indexOf('1') !== -1
    },
    //箭头有上下，因此需要有两个
    isDesc(){
      return this.searchParams.order.includes('desc')
    },
    isAsc(){
      return this.searchParams.order.includes('asc')
    }
  },

  //搜索时间，在search的再次点击事件，都要重新获取不同的数据
  methods: {
    //获取数据方法
    getData() {
      this.$store.dispatch('search/getSearchData', this.searchParams)
      // console.log('专挑了')
    },

    // 移除类名面包屑
    removeBread() {
      //移除面包屑首先就是要重新进行搜索,因此也需要清空原有的信息残留，
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.searchParams.categoryName = undefined
      //用splice方法使得vue可以监测到，跳转之前清空商品属性
      this.searchParams.props.splice(0,this.searchParams.props.length)

      //随后要url地址栏的重新清空(如果面包屑全部被删除)--路由的变化又会使得参数的重新请求(等会调整)
      //若是此时仍带有params参数，则仍需要将其带上,空串就用undefined

      this.$router.push({
        name: 'Search',
        params: this.$route.params || undefined
      })
    },

    //移除关键词面包屑--并清除兄弟组件Hearder中搜索栏的关键词
    removeKeyword() {
      //清除本地关键词
      this.searchParams.keyword = undefined
      //清除兄弟组件关键词
      this.$bus.$emit('removeKeyword')
      //转跳到自身
      this.$router.push({
        name: 'Search',
        query: this.$route.query || undefined
      })
    },

    //自定义事件响应----品牌
    getTradeMark(value){
      //对数据进行处理 id:pingpai
      this.searchParams.trademark = `${value.tmId}:${value.tmName}`
      //再次发送请求,这里由于不会修改地址栏，因此需要主动转跳--watch监视的是$route

      this.getData()
    },
    //品牌面包屑的移除
    removetrademark(){
      //移除并重新转跳
      this.searchParams.trademark = undefined
      this.getData()
    },

    //自定义响应事件---商品属性
    getGoodsDetail(props){
      //判断属性是否已存在
      if(this.searchParams.props.indexOf(props) ===-1){
        //表示数组中还没有
        this.searchParams.props.push(props)
        //更新页面
        this.getData()
      }
      
    },
    //移除事件
    removeProps(index){
      this.searchParams.props.splice(index,1)
      this.getData()
    },

    //排序
    changeSort(flag){
      //首先获取当前的分类以及排序
      let orginCategory = this.searchParams.order.split(':')[0]
      let orginOrder = this.searchParams.order.split(':')[1]
      let newOrder = ''
      if (orginCategory === flag){
        //说明当前点击的和当前分类的active是同一个,直接改变排序方式即可
        newOrder = `${orginCategory}:${orginOrder==='desc'? 'asc':'desc'}`
      }else{
        //进入此处，说明切换了分类，默认排序都是降序的
        newOrder = `${flag}:desc`
      }
      //替换原先的值，并发送请求
      this.searchParams.order = newOrder
      this.getData()
    },

    //点击页面的自定义事件
    getPage(page){
      // console.log(page)
      //接收到的参数整合，并进行转跳
      this.searchParams.pageNo = page
      this.getData()
    }
  },

  //route路由变化的时候就需要重新发送请求，获取当前的搜索值
  watch: {
    $route() {
      //由于没有清空机制，会重复将上次请求的一些信息残留，因此除了第一次，每次发送请求之间都要对数据进行归零
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      //用splice方法使得vue可以监测到，跳转之前清空商品属性
      this.searchParams.props.splice(0,this.searchParams.props.length)

      //发送数据之前，要将当前最先的数据带给服务器
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      this.getData()
    }
  },
  beforeDestroy(){
    //自定义事件的解绑
    this.$off('getTradeMark')
  },
  //
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>