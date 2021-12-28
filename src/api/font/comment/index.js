import request from '../../../utils/request.js'

/**
 * 游客评论
 */
export function submitComment(params ={}) {
    return request({
        url: '/font/create',
        method: 'post',
        data: params
    })
}

/**
 * 获取文章下的评论
 */
export function getComment(params = {}) {
    return request({
        url: '/font/getComment',
        method: 'get',
        params: params
    })
}