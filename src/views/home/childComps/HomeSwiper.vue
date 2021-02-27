<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index'
export default {
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return {
      isLoad:false
    }
  },
   components: {
    Swiper,
    SwiperItem
  },
  methods: {
    //监听图片加载完
    imageLoad() {
      //只需要调用一次
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>