<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <!-- 绑定点击事件，高亮选择的图片 -->
      <div class="swiper-slide" v-for="(item,index) in skuImageList" :key="item.id" >
        <img :src="item.imgUrl" @click="hightLight(index)" :class="{active:currentIndex === index}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
//轮播图还没有New
import Swiper from 'swiper'
export default {
  name: "ImageList",
  data(){
    return{
      currentIndex:0
    }
  },
  props: ['skuImageList'],
  methods:{
    hightLight(index){
      this.currentIndex = index
      //点击轮播图，上方放大镜同步修改--全局事件总线
      this.$bus.$emit('getIndex',index)
    }
  },
  //等数据加载号后，结构有了挂在轮播图
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        new Swiper('.swiper-container', {

          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          //同时显示的数目
          slidesPerView : 3,
          //一次切换几张图片
          slidesPerGroup : 2,
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;

    &::after {
      font-size: 12px;
    }
  }
}
</style>