import Vue from 'vue'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doubleCounter: state =>{
      return state.count * 2
    }
  },
  mutations: {
    add(state) {
      state.count =  state.count + 1
    }
  },
  actions: {
    add({commit}){
      setTimeout(() =>{
        commit('add')
      }, 1000)
    }
  },
  modules: {
  }
})
