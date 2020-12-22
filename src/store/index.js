import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paramMap: {}
  },
  mutations: {
    refreshParam(state, paramKV) {
      Vue.set(state.paramMap, paramKV.key, paramKV.value)
    }
  },
  actions: {
  },
  modules: {
  }
})
