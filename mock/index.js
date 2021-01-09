// 引入ANGLE_instanced_arrays
const Mock = require('mockjs')
// 请求地址，请求方法（post/get）,require(请求数据地址)

Mock.mock('/home', 'post', function(options) {
  console.log(JSON.parse(options.body))
  return show(JSON.parse(options.body))
})

function show(data) {
  const homeData = []
  for (let i = 1; i <= 91; i++) {
    homeData.push({
      title: '这是标题' + i,
      content: '这是介绍' + i,
      time: '2020-01-09' + i,
      classify: '分类' + i
    })
  }
  return homeData.slice((data.currentPage - 1) * 10, ((data.currentPage - 1) * 10) + 10)
}
