import request from '../../../utils/request.js'

/**
 * 评论回复
 */
export function replayComment(params = {}) {
    return request({
        url: '/admin/replay',
        method: 'post',
        data: params
    })
}

/**
 * 改变评论状态
 */
export function changeComment(params = {}){
    return request({
        url: '/admin/article/comment/status',
        method: 'post',
        data: params
    })
}

/**
 * 用户下根据状态返回评论列表
 */
export function commentList(params = {}) {
    return request({
        url: '/admin/getCommentList',
        method: 'get',
        params: params
    })
}