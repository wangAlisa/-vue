<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <lg-preview></lg-preview>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
 [v-cloak] {
    display: none !important;
  }
  #app{
    overflow: hidden;
    padding: .5px 0 0 0;
  }
</style>
