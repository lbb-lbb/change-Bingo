import Vue from 'vue'
import VueRouter from 'vue-router'
import font from "./font/index";
import admin from "./admin/index";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../view/font/BaseLayout'),
    children: font
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/common/Login'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/user/',
    component: () => import('../view/admin/UserLayout'),
    meta: {
      title: '后台管理页'
    },
    children: admin
  }
]
// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
export default new VueRouter({
  mode: 'history',
  routes
})

