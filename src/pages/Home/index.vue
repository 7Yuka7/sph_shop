<template>
    <div>
        <TypeNav />
        <ListContainer />
        <Recommend />
        <Rank/>
        <Like/>
        <Floor v-for="list in floorList" :key="list.id" :datum="list"/>
        <Brand/>
    </div>
</template>

<script>
    import ListContainer from '@/pages/Home/ListContainer'
    import Recommend from '@/pages/Home/Recommend'
    import Rank from '@/pages/Home/Rank'
    import Like from '@/pages/Home/Like'
    import Floor from '@/pages/Home/Floor'
    import Brand from '@/pages/Home/Brand'

    import { mapState } from 'vuex'

    export default{
        name:'',
        components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
        mounted(){
            //发送请求，获取的数据传递给Floor子组件
            this.$store.dispatch('home/floorList')
            
            //挂载的时候，请求用户的信息--不再使用，由路由守卫统一派发
            // this.$store.dispatch('registerAndLogin/getUserInfo')
        },
        computed:{
            ...mapState('home',['floorList'])
        }
    }
</script>
<style>

</style>