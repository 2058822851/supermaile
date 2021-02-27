<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :isCheck='isSelectAll' class="check-button" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:￥{{totalPrice}}
    </div>
    <div class="calculate"  @click='calClick' >
      去结算({{checkLength}})
    </div>
    
  </div>
</template>
<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
  components: { CheckButton },
  methods: {
    //点击全选按钮
    checkClick() {
      //如果原来都选中
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    },
    calClick() {
      if(!this.isSelectAll) {
        this.$toast.show('请选择结算商品', 2000)
      }
    }
  },
  computed: {
    //计算总价
    totalPrice()  {
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      },0).toFixed(2)
    },
    //计算总数
    checkLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked 
      }).reduce ((preLength, item) => {
        return preLength + item.count
      },0)
    },
    //是否全选
    isSelectAll(){
      if(this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.find(item => !item.checked)
    }
  }
}
</script>
<style scoped>
  .bottom-bar {
    width: 100%;
    background: #eee;
    height: 40px;
    display: flex;
    align-items: center;
  }
  .check-content {
    display: flex;
    height: 40px;
    align-items: center;
    width: 80px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    margin: 0 5px 0 10px;
  }
  .price {
    /* margin-left: 20px; */
    flex: 1
  }
  .calculate {
    width:100px ;
    height: 100%;
    background-color: hsl(29, 90%, 48%);
    line-height: 40px;
    text-align:center ;
    color:white;
  }
</style>