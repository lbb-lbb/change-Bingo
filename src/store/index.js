import Vue from 'vue'
import Vuex from 'vuex'
import * as util from '../utils/util'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: util.getSessionStorage('user') || {},
    token: util.getSessionStorage('token') || ''
  },
  getters: {
    getUser: state => state.user,
    token: state => state.token
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      util.setSessionStorage('user', data)
    },
    setToken(state, data) {
      state.token = data
      util.setSessionStorage('token', data)
    }
  },
  actions: {
    setUser({commit}, data) {
      commit('setUser', data)
    },
    setToken({commit}, data) {
      commit('setToken', data)
    }
  }
})
