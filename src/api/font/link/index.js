import request from '../../../utils/request.js'

/**
 *获取友链列表
 */
export function getLinklist(params = {}) {
  return request({
    url: '/font/friendLink/list',
    method: 'get',
    params: params
  })
}
