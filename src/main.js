import Vue from 'vue'
import App from './App'
import toastr from 'toastr'
import MuseUI from 'muse-ui'
import Vodal from 'vodal'
import axios from 'axios'
import store from './vuex/store'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'vue-swipe/dist/vue-swipe.css'
import 'toastr/build/toastr.min.css'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import './static/css/icon.css'
import 'vodal/fade.css'
import 'animate.css'
Vue.use(MuseUI)
Vue.use(VueAwesomeSwiper)
Vue.prototype.$http = axios
Vue.prototype.toastr = toastr
Vue.component(Vodal.name,Vodal)
toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}
// Vue.filter('imgUrlPrefix',(value) => {
//   const url = value.substr(7)
//   const prefix = "https://images.weserv.nl/?url="
//   return prefix + url
// })
Vue.filter('castsToString',(casts) => {
  return casts.map(item => {
    return item.name
  })
})

/* eslint-disable no-new */
new Vue({
  created(){
    toastr.success('启动成功!')
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
