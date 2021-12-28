import request from '../../../utils/request.js'

/**
 * 返回所有发布文章列表
 */
export function getHomeData(params = {}) {
    return request({
        url: '/font/articleList',
        method: 'get',
        params: params
    })
}

/**
 *  文章详情
 */
export function getArticleInfo(params = {}) {
    return request({
        url: '/font/articleInfo',
        method: 'get',
        params: params
    })
}

/**
 * 全局文章标题搜索
 */
export function getGlobalSearchData(params = {}) {
    return request({
        url: '/font/articleList',
        method: 'get',
        params: params
    })
}