import request from '../utils/request.js'

export function getSomeThing() {
  return request({
    url: '/test',
    method: 'get'
  })
}

export function Login(params = {}) {
  return request({
    url: '/user/login',
    method: 'post',
    data: params
  })
}

export function getHomeData(params = {}) {
  return request({
    url: '/show/articleList',
    method: 'get',
    params: params
  })
}
/**
 *  文章详情
 * @param params
 * @returns {AxiosPromise}
 */
export function getArticleInfo(params ={}) {
  return request({
    url: '/show/articleInfo',
    method: 'get',
    params: params
  })
}

export function getGlobalSearchData(params ={}) {
  return request({
    url: '/show/articleList',
    method: 'get',
    params: params
  })
}

export function submitComment(params ={}) {
  return request({
    url: '/comment/create',
    method: 'post',
    data: params
  })
}

export function getComment(params ={}) {
  return request({
    url: '/comment/getComment',
    method: 'get',
    params: params
  })
}


