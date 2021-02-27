import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast/index'

Vue.config.productionTip = false

Vue.use(toast)

//解决移动端三百毫秒延迟
FastClick.attach(document.body)

//使用懒加载插件
Vue.use(VueLazyLoad, {
  //占位图片
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
