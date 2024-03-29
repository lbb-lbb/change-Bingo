import Vue from 'vue'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './plugin/elementUi'
import './public/css/icon/iconfont.css'
import './public/css/font/index.css'
import './public/css/style/common.less'
import 'animate.css'
import {Message} from 'element-ui'
// 引入mock造数据
// import '../mock/index'

// vue原型链上挂载一使用常用的方法
import * as api from './api/index'
import * as util from './utils/util'
Vue.prototype.$dao = api
Vue.prototype.$message = Message
Vue.prototype.$util = util

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
