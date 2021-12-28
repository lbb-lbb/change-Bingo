import request from '../../../utils/request.js'

/**
 * 上传f图片地址
 * @return 返回图片访问地址
 */
export function getUpload(params = {}) {
    console.log(request)
    return request({
        url: '/admin/upload',
        method: 'post',
        data: params
    })
}