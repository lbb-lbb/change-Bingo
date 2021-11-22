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
    url: '/show/articleList',
    method: 'get',
    params: params
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

export function getGlobalSearchData(params) {
  return request({
    url: '/show/articleList',
    method: 'get',
    params: params
  })
}
