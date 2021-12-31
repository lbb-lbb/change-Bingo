import request from '../../../utils/request.js'

/**
 * 新增或创建项目
 */
export function createProject(params = {}) {
  return request({
    url: 'admin/project/create',
    method: 'post',
    data: params
  })
}

/**
 * 删除项目
 */
export function deleteProject(params = {}) {
  return request({
    url: 'admin/project/delete',
    method: 'post',
    data: params
  })
}
