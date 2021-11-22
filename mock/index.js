// 引入ANGLE_instanced_arrays
const Mock = require('mockjs')
// 请求地址，请求方法（post/get）,require(请求数据地址)
Mock.setup({
  timeout: '200-600' // 设置mock拦截接口的响应时间
})
Mock.Random.csentence() // 标题占位符
Mock.Random.cparagraph() // 段落占位符
Mock.Random.datetime() // 时间占位符
Mock.Random.id() // 自然数占位符

Mock.mock('/home', 'post', {
  'list|10': [
    {
      title: '@csentence(6)',
      content: '@cparagraph(4)',
      time: '@datetime()',
      id: '@id',
      classify: '@csentence(3)'
    }
  ]
})

Mock.mock('/bingo', 'get', function(options) {
  return bingo()
})

/* Mock.mock('/search', 'post', )*/

function bingo() {
  const bingoData = []
  const classify = ['HTML', 'Javascript', 'CSS', 'VUE', '功能实现', '随笔', '书籍推荐', '文章推荐', '小程序', '文章推荐']
  for (const j in classify) {
    for (let i = 0; i <= 9; i++) {
      bingoData.push(
        Mock.mock({
          title: '@csentence(6)',
          content: '@cparagraph(4)',
          time: '@datetime(2020-MM-dd)',
          id: '@id',
          classify: classify[j]
        })
      )
    }
  }
  return bingoData
}

