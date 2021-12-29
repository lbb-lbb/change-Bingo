import axios from 'axios'
import store from '../store/index'
import {Message} from 'element-ui'
const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000,
  // withCredentials: true
})

const err = (error) => {
  if (error.response) {
    // const data = error.response.data
    switch (error.response.status) {
      case 500:
        Message.error(error.response.data.message || '服务器异常')
        break
      case 401:
        store.actions.setUser({})
        store.actions.setToken('')
        Message.error('登录失效了')
        break
      case 300:
        Message.error(error.response.data.message || '系统异常')
        break
      default:
        break
    }
    switch (error.response.data.state) {
      case 500:
        Message.error(error.response.data.message || '服务器异常')
        break
      case 300:
        Message.error(error.response.data.message || '系统异常')
        break
      default:
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
  return response.data
}, err)

export default service
