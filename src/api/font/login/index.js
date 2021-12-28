import request from '../../../utils/request.js'

export function Login(params = {}) {
  return request({
    url: '/font/login',
    method: 'post',
    data: params
  })
}