import request from '../../../utils/request.js'

/**
 *获取登录页文章列表
 */
export function getUserHomeData(params = {}) {
  return request({
    url: '/admin/article/list',
    method: 'get',
    params: params
  })
}

export function getArticleInfo(params = {}) {
  return request({
    url: '/admin/article/info',
    method: 'get',
    params: params
  })
}

/**
 * 创建文章
 */
export function createArticle(params = {}) {
  return request({
    url: 'admin/article/create',
    method: 'post',
    data: params
  })
}

/**
 * 修改文章状态
 */
export function changeArticle(params = {}) {
  return request({
    url: 'admin/article/status',
    method: 'post',
    data: params
  })
}