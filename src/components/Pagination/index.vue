<template>
    <div class="pagination">
        <!-- 上 -->
        <!-- 当前页是1就不可以进行点击 -->
      <button :disabled="pageNo === 1" @click="$emit('getPage',pageNo-1)">上一页</button>
      <!-- 在中间部分能够完整执行12345的时候并不需要 -->
      <button v-if="startNumAndEndNum.start>1"  @click="$emit('getPage',1)" :class="{active:pageNo === 1}">1</button>
      <button v-if="startNumAndEndNum.start>2">···</button>

        <!-- 中,优化：外面套template执行v-for，里面再使用v-if --[里面的n就是页码]-->
      <button v-for="(n,index) in startNumAndEndNum.end" :key="index" v-if="n>=startNumAndEndNum.start"  @click="$emit('getPage',n)" :class="{active:pageNo === n}">{{ n }}</button>

        <!-- 下 -->
        <!-- 同理，在末尾部分能够完整的执行一整串的时候不显示 -->
      <button v-if="startNumAndEndNum.end<totalPage-1" >···</button>
      <button v-if="startNumAndEndNum.end<=totalPage-1"  @click="$emit('getPage',totalPage)" :class="{active:pageNo === totalPage}">{{totalPage}}</button>
      <!-- 当前已经处于末页的时候不可点击 -->
      <button :disabled="pageNo === totalPage" @click="$emit('getPage',pageNo+1)">下一页</button>
      
      <button style="margin-left: 30px">共 {{total}} 条</button>
    </div>
  </template>
  
  <script>
    export default {
      name: "Pagination",
      props:['pageNo','pageSize','total','continues'],
      computed:{
        //总页数
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        //计算连续的页数
        startNumAndEndNum(){
            let start = 0
            let end = 0
            // 非正常情况----总页数还没continues的页数多
            if(this.totalPage < this.continues){
                start = 1
                end = this.totalPage
            }else{
                //正常情况，前后分别都是一般的continues，基于当前页而言
                start = this.pageNo - Math.floor(this.continues/2)
                end = this.pageNo + Math.floor(this.continues/2)

                //特别处理前几页和后几页
                if(start < 1){
                    start = 1
                    end = this.continues
                }
                if(end > this.totalPage){
                    end = this.totalPage
                    start = end - this.continues + 1
                }
            }
            return {start,end}
        },

      }
    }
  </script>
  
  <style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
    }
  </style>
  