import Vue from 'vue'
import VueRouter from 'vue-loader'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home'
  },
  {
    path: '/about'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
