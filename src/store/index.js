import Vue from 'vue'
import Vuex from 'vuex'
import * as util from '../utils/util'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: util.getSessionStorage('user') || {},
    token: util.getSessionStorage('token') || "",
    login: util.getSessionStorage('login') || false,
  },
  getters: {
    getUser: state => state.user,
    getToken: state => state.token,
    getLogin: state => state.login
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      util.setSessionStorage('user', data)
    },
    setToken(state, data) {
      state.token = data
      util.setSessionStorage('token', data)
    },
    setLogin(state, data) {
      state.login = data
      util.setSessionStorage('login', data)
    }
  },
  actions: {
    setUser({commit}, data) {
      commit('setUser', data)
    },
    setToken({commit}, data) {
      commit('setToken', data)
    },
    setLogin({commit}, data) {
      commit('setLogin', data)
    }
  }
})
