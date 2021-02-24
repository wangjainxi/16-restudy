import Vue from 'vue'
import VueRouter from './kvue-router'
import Home from '../views/Home.vue'
// 执行 install方法，执行的时刻要比new Vue 要早；
// 但是还要从这个里面把 router拿出来；
// 在use(VueRouter)的时候，就要拿到下面才创建的vue-router实例；当执行的时候这个实例还不存在
// 需要把执行的时刻往后推一点
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
