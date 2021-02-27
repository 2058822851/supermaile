<template>
  <div class="tap-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
    <!-- <img src="../../assets/img/tabbar/category.svg" alt="">
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props: {
    path: String,
    activeColor:{
      type: String,
      default: 'red'
    }
  },
  data (){
    return{
      //isActive:false,
    }
  },
  computed: {
    isActive() {
      //当前的path与我们选中的path相同时
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path)
    }
  }
}
</script>

<style>
  .tap-bar-item{
    height: 49px;
    text-align: center;
    flex: 1;
    font-size: 14px;
  }
  .tap-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
  /* .active{
    color: brown;
  } */
</style>