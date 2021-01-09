'use strict'

import request from '../utils/request.js'

export function getSomeThing() {
  return request({
    url: '/test',
    method: 'get'
  })
}

export function getHomeData(params) {
  return request({
    url: '/home',
    method: 'post',
    data: params
  })
}
