import axios from 'axios'

const service = axios.create({
  baseURL: '',
  timeout: 5000,
  withCredentials: true
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data

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
  // TODO
})

service.interceptors.response.use(response => {
  // TODO
}, err)

export default service