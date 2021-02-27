<template>
  <div class="cart-list">
    <scroll class="content" 
    :pullUpLoad = 'true'
    ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" 
      :key="index" 
      :product='item'></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Scroll from 'components/common/bscroll/Scroll.vue'
import CartListItem from './CartListItem.vue'

export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 49px - 44px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>