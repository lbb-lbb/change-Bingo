import Vue from 'vue'
import router from './router/index'
import store from './store/index'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import './plugin/elementUi'
import '../mock/index'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
