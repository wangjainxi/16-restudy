import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count =  state.count + 1
    }
  },
  actions: {
    add({commit}){
      commit()
    }
  },
  modules: {
  }
})
