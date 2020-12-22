import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playList: [],
    songListId: 0,
    songId: 0
  },
  mutations: {
    setSongListId(state, id) {
      state.songListId = id
    },
    setPlayList(state, list) {
      state.playList = list
    },
    setSongId(state, id) {
      state.songId = id
    },
  },
  actions: {
    getPlayList(context, id) {
      let list = []
      axios.get('/playlist/detail', { params: { id } }).then(({data: res}) => {
        res.playlist.trackIds.forEach(item => {
          list.push(item.id)
        });
        context.commit('setPlayList', list)
      })
    }
  },
  modules: {
  }
})
