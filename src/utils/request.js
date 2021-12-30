import axios from 'axios'
import store from '../store/index'
import {Message} from 'element-ui'
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
  // withCredentials: true
})

const err = (response) => {
  console.log(response)
  if (response.status === 200) {
    switch (response.data.state) {
      case 500:
        Message.error(response.data.message || '服务器异常')
        return
      case 300:
        Message.error(response.data.message || '系统异常')
        return
      default:
        Message.error(response.data.message || '未知错误')
        break
    }
  } else {
    switch (response.status) {
      case 500:
        Message.error(response.data.message || '服务器异常')
        break
      case 401:
        console.log(store)
        store.dispatch('setUser', {})
        store.dispatch('setToken', '')
        store.dispatch('setLogin', false)
        Message.error('登录失效了')
        break
      case 300:
        Message.error(response.data.message || '系统异常')
        break
      default:
        Message.error(response)
        break
    }
  }
}

service.interceptors.request.use(config => {
  config.headers = { 'Content-type': 'application/json' }
  config.headers = { 'Authorization': `Bearer ${store.getters.getToken}` }
  return config
})

service.interceptors.response.use(response => {
  console.log(response)
  if (response.status === 200) {
    if (response.data.success) {
      return response.data
    } else {
      err(response)
    }
  } else {
    return new Promise.reject(response)
  }
}, error => {
  err(error.response)
})

export default service
