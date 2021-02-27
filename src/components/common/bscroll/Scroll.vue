<template>
  <div class="wapper" ref="wapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  //生命周期函数，组件创建完成之后使用
  mounted(){
    //probeType
    //0,1不会记录滚动值
    //2,只记录鼠标滚动值
    //3,监听所有滚动值
    this.scroll = new BScroll(this.$refs.wapper,{
      probeType: this.probeType,
      pullUpLoad:this.pullUpLoad,//上拉加载更多
      click:true,
      observeDOM: true,
      observeImage:true
    })
    //监听滚动位置
    this.scroll.on('scroll',(position) => {
       //console.log(position);
       //将position传出去
       this.$emit('scroll',position)
    })
    //监听上拉事件
    this.scroll.on('pullingUp',() => {
      //console.log("上拉建在更多");
      this.$emit('pullingUp')
    })

  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>
.wapper {
  overflow: hidden;
}
</style>