<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>


<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {mapGetters} from 'vuex'
  import CartList from './childrenComponents/CartList.vue'
  import CartBottomBar from './childrenComponents/CartBottomBar.vue'
  
  export default {
    name: 'ShopCar',
    components: {
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed: {
      //mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性
      ...mapGetters(['cartLength'])
    }
  }
</script>


<style scoped>
  .cart {
    height: 100vh;
    }
  .nav-bar {
    background: #FF8198;
    color: #fff
  }
</style>