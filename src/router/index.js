import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('../view/BaseLayout'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../view/HomeLayout')
      },
      {
        path: '/blog',
        name: 'Blog',
        component: () => import('../view/BlogLayout')
      },
      {
        path: '/openSource',
        name: 'OpenSource',
        component: () => import('../view/TimeClassifyLayout')
      },
      {
        path: '/wiki',
        name: 'Wiki',
        component: () => import('../view/WikiLayout')
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../view/AboutLayout')
      },
      {
        path: '/view',
        name: 'View',
        component: () => import('../view/ViewLayout')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/Login')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../view/userLayout'),
    children: [
      {
        path: '/',
        name: 'userHome',
        component: () => import('../view/HomeLayout')
      },
      {
        path: '/notification',
        name: 'Notification'
      },
      {
        path: '/setting',
        name: 'Setting'
      },
      {
        path: 'write',
        name: 'Write'
      }
    ]
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

