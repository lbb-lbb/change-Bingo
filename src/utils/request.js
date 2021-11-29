import axios from 'axios'
import store from '../store/index'
const service = axios.create({
  baseURL: 'http://localhost:3005',
  timeout: 5000,
  // withCredentials: true
})

const err = (error) => {
  if (error.response) {
    // const data = error.response.data
    switch (error.response.status) {
      case 500:
        break
      case 401:
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
