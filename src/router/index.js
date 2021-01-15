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
        component: () => import('../view/Open-SourceLayout')
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
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})

