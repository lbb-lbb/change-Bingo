export default [
    /* {
       path: '',
       name: 'userHome',
       component: () => import('../view/font/HomeLayout'),
       meta: {
         title: '后台首页'
       }

     },*/
    {
        path: 'articleList',
        name: 'articleList',
        component: () => import('../../view/font/HomeLayout'),
        meta: {
            title: '文章列表'
        }
    },
    {
        path: 'write',
        name: 'Write',
        component: () => import('../../view/admin/Write'),
        meta: {
            title: '创作'
        }
    },
    {
        path: 'manageProject',
        name: 'manageProject',
        component: () => import('../../view/admin/Message'),
        meta: {
            title: '项目管理'
        }
    },
    {
        path: 'notification',
        name: 'notification',
        component: () => import('../../view/admin/Message'),
        meta: {
            title: '评论管理'
        }
    },
    {
        path: 'manageFriendLink',
        name: 'manageFriendLink',
        component: () => import('../../view/admin/Message'),
        meta: {
            title: '友链管理'
        }
    },
    {
        path: 'setting',
        name: 'setting',
        component: () => import('../../view/admin/Setting'),
        meta: {
            title: '设置'
        }
    }
]