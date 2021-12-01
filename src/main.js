import Vue from 'vue'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './plugin/elementUi'
import '../public/css/icon/iconfont.css'
import {Message} from 'element-ui'
// import '../mock/index'
import * as api from './api/index'

Vue.prototype.$dao = api
Vue.prototype.$message = Message

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
