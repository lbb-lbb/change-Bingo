import request from '../../../utils/request.js'

/**
 * 返回所有发布文章列表
 */
export function getCommonUserMessage(params = {}) {
  return request({
    url: '/font/userMessage',
    method: 'get',
    params: params
  })
}