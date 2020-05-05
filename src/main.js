import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'
import VueYoutube from "vue-youtube";

Vue.config.productionTip = false

Vue.use(Vue2TouchEvents)
Vue.use(VueYoutube);
Vue.prototype.$appName = 'Kerkquiz'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
