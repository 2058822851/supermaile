<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <!-- <router-view></router-view> -->
    <main-tabbar/>
  </div>
</template>
<script>
import MainTabbar from 'components/content/mainTabbar/MainTabbar'
export default {
  components: {
    MainTabbar
  }
}
</script>
<style>
@import "./assets/css/bace.css";


</style>
