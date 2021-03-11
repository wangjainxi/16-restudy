// eslint:disabled
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import createRouter from './router/index';

Vue.config.productionTip = false
// 每个请求一个实例
// 调用者是entery-server

export function createApp(context: any){
  const router = createRouter()
  const app = new Vue({
    router,
    store,
    context,
    render: h => h(App)
  }).$mount('#app')
  return {app, router}
}


