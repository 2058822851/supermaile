import BackTop from 'components/content/backtop/BackTop'

export const backTopMixin = {
  data(){
    return {
      isShow:false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick(){
      //scrollTo参数非别为原始位置和时间
      this.$refs.scroll.scrollTo(0,0,300)
    }
  }
}