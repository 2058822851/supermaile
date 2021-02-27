import Vue from 'vue'
import Vuex, { Store } from 'vuex'

//安装插件
Vue.use(Vuex)

//创建store对象
const store = new Vuex.Store({
  state: {
    cartList:[]
  },
  mutations: {
   addCounter(state, payload) {
    payload.count++
   },
   addToCart(state, payload) {
     payload.checked = true
     state.cartList.push(payload)
   }
  },
  actions: {
    addCart(context, payload){
      return new Promise((resolve, reject) => {
        let oldProduct = null
        for(let item of context.state.cartList){
          if (item.iid === payload.iid) {
            oldProduct = item
          }
        }
        if(oldProduct) {
          //oldProduct.count += 1
          context.commit('addCounter', oldProduct)

          resolve('当前商品数量+1')
        } else {
          payload.count = 1
          //context.state.cartList.push(payload)
          context.commit('addToCart', payload)
          
          resolve('添加了心得商品')
        }
      })
    }
  },
  getters: {
    cartLength(state) {
      return state.cartList.length
    },
    cartList(state) {
      return state.cartList
    }
  },
  modules: {

  }
})

//挂载到vue实例上
export default store