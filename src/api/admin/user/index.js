import request from '../../../utils/request.js'

/**
 * 修改用户资料
 */
export function setUserInfo(params = {}) {
  return request({
    url: '/admin/editMessage',
    method: 'post',
    data: params
  })
}

/**
 * 修改用户密码
 */
export function setUserPassword(params = {}) {
  return request({
    url: '/admin/changePassword',
    method: 'post',
    data: params
  })
}

