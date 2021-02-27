<template>
  <div id="home" >
    <!-- 导航 -->
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
      @tabClick='tabClick' 
      ref="tabControl1"
      class="tab-control"
      v-show="isTabfixed"></tab-control>
    <!-- 滚动 -->
    <scroll class="content" ref="scroll" 
    :probe-type = '3'
     @scroll="contentScroll"
    :pullUpLoad = 'true'
    @pullingUp ='loadMore'
     >
      <!-- 轮播 -->
      <home-swiper :banners='banners' @swiperImageLoad = 'swiperImageLoad'></home-swiper>
      <!-- 推荐 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <!-- 本周流行 -->
      <feature-view></feature-view>
      <!-- 选项卡 -->
      <tab-control :titles="['流行','新款','精选']" 
      @tabClick='tabClick' 
      ref="tabControl2"></tab-control>
      <!-- 选项卡内容 -->
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <!-- 返回顶部 -->
    <!-- 监听组建的原生事件需要native修饰符才能进行监听 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
  </div>
 
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/bscroll/Scroll.vue'
import BackTop from 'components/content/backtop/BackTop'

import {getHomeMultidate,getHomeGoods} from "network/home"

import HomeSwiper from './childComps/HomeSwiper.vue'
import RecommendView from './childComps/RecommendView.vue'
import FeatureView from './childComps/FeatureView'

export default {
  name: 'Home',
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      //用这个变量接受请求回来的数据
      banners:[],
      recommends:[],
      goods: {
        'pop':{page:0,list: []},
        'new':{page:0,list: []},
        'sell':{page:0,list: []}
      },
      currentType: 'pop',
      isShow:false,
      tabOffsetTop: 0,
      isTabfixed: false,//是否吸顶
      scrollY: 0,//记录位置
    }
    
  },
  //在组建刚创建完发送网络请求
  created() {
    //1请求多个数据（轮播和推荐数据）
    this.getHomeMultidate()
    //2请求商品数据（流行，新款，筛选）
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  destroyed() {},
//记录home页面离开时的位置
  //回来时自动来到该位置
  activated(){
    this.$refs.scroll.scrollTo(0,this.scrollY)
    //刷新
    this.$refs.scroll.scroll.refresh()
  },
  //离开时记录位置
  deactivated(){
    //1保存Y值
    this.scrollY = this.$refs.scroll.scroll.y
   
  },

  mounted() {
   
  },
  methods: {
    //事件监听相关方法
    tabClick(index) {
      console.log(index);
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break 
      }
      //让两个tabcontral保持一致
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick(){
      //scrollTo参数非别为原始位置和时间
      this.$refs.scroll.scrollTo(0,0,300)
    },
    contentScroll(position){
      //console.log(position);
      //1判断返回顶部是否显示
     this.isShow = -position.y > 1000 ? true : false
      //2判断是否吸顶
    this.isTabfixed = -position.y > this.tabOffsetTop ? true : false
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
       //获取tabcontrol的offsettop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      
    },
    //网络请求相关方法
    getHomeMultidate() {
      getHomeMultidate().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      //console.log(res);
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page+=1
      //console.log(res);

      //不只能刷新一次
      this.$refs.scroll.finishPullUp()
    })
    }
  }

}
</script>

<style scoped>
/* scoped作用域的意思，就算别的地方有同样的class名，也不会影响 */
#home {
  /* padding-top: 44px; */
  height: 100vh;/* 视口高度 */
  position: relative;
}
 .home-nav {
   background-color: var(--color-tint);
   color: #fff;
   /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
   /* position: fixed;
   left: 0;
   top: 0;
   right: 0;
   z-index: 9; */
 }
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
 /* .tabcontrol{
   position: sticky;
   top: 44px;
   z-index: 9;
 } */
.tab-control{
  position: relative;
  z-index: 9;
}
 .content {
   /* height: calc(100% - 93px);
   margin-top: 44px; */
   position: absolute;
   top: 44px;
   bottom: 49px;
   left: 0;
   right: 0;
 }
</style>