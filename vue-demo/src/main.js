// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from "muse-ui"
import 'muse-ui/dist/muse-ui.css'
import gallery from 'img-vuer'
import vuePicturePreview from 'vue-picture-preview'
import VuePreview from 'vue-preview'
import VideoPlayer from 'vue-video-player'

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

Vue.use(VuePreview)
// with parameters install
Vue.use(VuePreview,{
  mainClass: 'pswp--minimal--dark',
  barsSize: {top: 0, bottom: 0},
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})

Vue.config.productionTip = false
Vue.use(MuseUI);
Vue.use(gallery)
Vue.use(vuePicturePreview)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
