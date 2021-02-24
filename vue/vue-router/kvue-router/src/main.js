import Vue from 'vue'
import App from './App.vue'
import router from './krouter/index'
import store from './kstore'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
