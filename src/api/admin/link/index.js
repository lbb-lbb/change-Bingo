import request from '../../../utils/request.js'

/**
 * 新增或创建友链
 */
export function createLink(params = {}) {
  return request({
    url: 'admin/friendLink/create',
    method: 'post',
    data: params
  })
}

/**
 * 删除友链
 */
export function deleteLink(params = {}) {
  return request({
    url: 'admin/friendLink/delete',
    method: 'post',
    data: params
  })
}
