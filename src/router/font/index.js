export default [
    {
        path: '',
        name: 'Home',
        component: () => import('../../view/font/HomeLayout'),
        meta: {
            title: '前台首页'
        }
    },
    {
        path: 'classification',
        name: 'classification',
        component: () => import('../../view/font/BlogLayout'),
        meta: {
            title: '所有文章分类'
        }
    },
    {
        path: 'timeLine',
        name: 'timeLine',
        component: () => import('../../view/font/TimeClassifyLayout'),
        meta: {
            title: '创作时间线'
        }
    },
    {
        path: 'msgCard',
        name: 'msgCard',
        component: () => import('../../view/font/WikiLayout'),
        meta: {
            title: '留言板'
        }
    },
    {
        path: 'friendLink',
        name: 'friendLink',
        component: () => import('../../view/font/WikiLayout'),
        meta: {
            title: '友链'
        }
    },
    {
        path: 'project',
        name: 'project',
        component: () => import('../../view/font/WikiLayout'),
        meta: {
            title: '开发项目展示'
        }
    },
    {
        path: 'about',
        name: 'About',
        component: () => import('../../view/font/AboutLayout'),
        meta: {
            title: '关于'
        }
    },
    {
        path: 'view',
        name: 'View',
        component: () => import('../../view/font/ViewLayout'),
        meta: {
            title: '浏览文章'
        }
    }
]