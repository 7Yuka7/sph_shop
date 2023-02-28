<template>
  <div class="spec-preview" ref="maskContainer">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="moveMask"></div>
    <div class="big" >
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data(){
      return{
        currentIndex:0
      }
    },
    computed:{
      //对接收到的数据也进行优化，保证返回的至少是一个空对象
      imgObj(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    methods:{
      //蒙版移动事件
      moveMask(event){
        //获取包裹放大器的容器
        let maskContainer = this.$refs.maskContainer
        // 先获取要操作的两个节点
        let mask = this.$refs.mask
        let big = this.$refs.big

        //计算蒙版的位置，如左边距离=鼠标距离父元素的距离减去蒙版宽度的一般
        let leftDistance = event.offsetX - mask.offsetWidth/2
        let topDistance = event.offsetY - mask.offsetHeight/2

        //给蒙版添加约束
        let leftMax = (maskContainer.offsetWidth - mask.offsetWidth) //蒙版左右的最大距离
        let topMax = (maskContainer.offsetHeight - mask.offsetHeight)
        //左右
        if(leftDistance < 0) leftDistance = 0
        if(leftDistance > leftMax) leftDistance = leftMax
        //上下
        if(topDistance < 0) topDistance = 0
        if(topDistance > topMax) topDistance = topMax

        //改变蒙版元素的绝对定位
        mask.style.left = leftDistance + 'px'
        mask.style.top = topDistance + 'px'

        //改变大图的位置，根据比例关系为两倍
        big.style.left = -2*leftDistance + 'px'
        big.style.top = -2*topDistance + 'px'
      }
    },
    mounted(){
      //挂载之前绑定事件监听
      this.$bus.$on('getIndex',(index)=>{

        this.currentIndex = index
      })
    },
    beforeDestroy(){
      //摧毁之前取消事件监听
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>