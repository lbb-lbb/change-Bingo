import request from '../../../utils/request.js'

/**
 *获取项目列表
 */
export function getProjectList(params = {}) {
  return request({
    url: '/font/project/list',
    method: 'get',
    params: params
  })
}
