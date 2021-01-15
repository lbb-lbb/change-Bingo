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

export function getBingoData() {
  return request({
    url: '/bingo',
    method: 'get'
  })
}

export function watchArticle(id) {
  return request({
    url: '/view',
    method: 'get',
    query: id
  })
}

export function getGlobalSearchData(data) {
  return request({
    url: '/search',
    method: 'post',
    data: data
  })
}
