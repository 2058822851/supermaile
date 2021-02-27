<template>
  <div id="detail" >
    <!-- 顶部导航 -->
    <detail-nav-bar @titleClick='titleClick' ref="nav"></detail-nav-bar>
    <!-- 滚动 -->
    <scroll class="content" 
    ref="scroll" 
    :pullUpLoad = 'true'
    :probeType = 3
    @scroll='commentScroll' >
      <!-- 轮播 -->
      <detail-swiper :topImages ='topImages'></detail-swiper>
      <!-- 基本信息 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 详情图片 -->
      <detail-goods-info :detailInfo="detailInfo" @imageLoad='imageLoad'></detail-goods-info>
      <!-- 参数信息 -->
      <detail-params-info :paramInfo="paramInfo" ref="params"></detail-params-info>
      <!-- 评论显示 -->
      <deatil-comment-info :commentInfo="commentInfo" ref="comment"></deatil-comment-info>
      <!-- 推荐展示 -->
      <goods-list :goods='recommendInfo' ref="recommend"></goods-list>
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShow"></back-top>
    <!-- 底部导航 -->
    <detail-bottom-bar @addCart='addCart'></detail-bottom-bar>
  </div> 
</template>

<script>
import DetailNavBar from './childCompones/DetailNavBar'
import DetailSwiper from './childCompones/DetailSwiper'
import DetailBaseInfo from './childCompones/DetailBaseInfo.vue'
import DetailShopInfo from './childCompones/DetailShopInfo.vue'
import DetailGoodsInfo from './childCompones/DetailGoodsInfo.vue'
import DetailParamsInfo from './childCompones/DetailParamsInfo.vue'
import DeatilCommentInfo from './childCompones/DeatilCommentInfo.vue'
import DetailBottomBar from './childCompones/DetailBottomBar'

import Scroll from 'components/common/bscroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import {debounce} from 'common/untils'
import {backTopMixin} from 'common/mixin'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"

export default {
  components: { 
    DetailNavBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailSwiper,
    DetailGoodsInfo,  
    DetailParamsInfo,
    DeatilCommentInfo, 
    DetailBottomBar,
    Scroll,
    GoodsList,
      },
  mixins: [backTopMixin],
  name: "Detail",
  data(){
    return {
      iid:null,
      topImages:[],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendInfo: [],
      themeTopY: [],
      getThemeTopY :null,
      currentIndex: 0
    }
  },  
  created() {
    //1保存传入的iid
    this.iid = this.$route.params.iid
    //2 根据iid请求到详情页数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      //获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages  
      //获取商品基本信息
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
      //获取店铺信息
      this.shop = new Shop(res.result.shopInfo)
      //保存商品详情数据
      this.detailInfo = res.result.detailInfo
      //获取参数
      this.paramInfo = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
      //获取评论信息
      if (res.result.rate.cRate !==0) {
        this.commentInfo = res.result.rate.list[0]
      }
    })
    //3 请求推荐数据
    getRecommend().then((res) => {
      //console.log(res);
      this.recommendInfo = res.data.list
    })
    
    //4给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {  
          this.themeTopY = []
          this.themeTopY.push(0)
          this.themeTopY.push(this.$refs.params.$el.offsetTop -44)
          this.themeTopY.push(this.$refs.comment.$el.offsetTop-44)
          this.themeTopY.push(this.$refs.recommend.$el.offsetTop-44)
          console.log(this.themeTopY)
      },100)
    },
  mounted() {
   
  },
  methods: {
    //图片加载完成
    imageLoad() {
      this.$refs.scroll.scroll.refresh()
      this.getThemeTopY()
    },
    //点击顶部导航跳转到对应的主题
    titleClick(index){
      this.$refs.scroll.scrollTo(0,-this.themeTopY[index], 200)
    },
    //滚动内容显示对应导航
    commentScroll(position) {
      const positionY = -position.y
      for (let i=0;i< this.themeTopY.length;i++){
        if(this.currentIndex !== i && ((i<this.themeTopY.length-1 && positionY>=this.themeTopY[i] && positionY<this.themeTopY[i+1]) || (i === this.themeTopY.length-1 && positionY>=this.themeTopY[i]))){
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      
       this.isShow = -position.y > 1000 ? true : false
    },
    //加入购物车
    addCart(){
      //获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      //console.log('.....');

      //将商品添加到购物车里
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res, 2000)
        console.log(res);
      })
    }
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
  /* 时该页面盖住下导航 */
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content{
/*  得有固定的高度 */
  height: calc(100% - 93px);
  overflow: hidden;
}
</style>