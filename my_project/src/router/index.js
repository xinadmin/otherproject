import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: {title: 'Dashboard', icon: 'dashboard'}
        }]
    },
    {
        path: '/tiezi',
        component: Layout,
        redirect: '/tiezi/tiezi',
        name: '贴子管理',
        meta: {title: '贴子', icon: 'shenhe'},
        alwaysShow: true,
        children: [
            {
                path: 'tiezi',
                name: 'Tiezi',
                component: () => import('@/views/tiezi/index'),
                meta: {title: '帖子列表', icon: 'nested',noCache: true, affix: false},
                affix: true
            },
            {
                path: 'checktiezi',
                name: 'Checktiezi',
                component: () => import('@/views/tiezi/checktiezi'),
                meta: {title: '审核贴子', icon: 'shenhe',noCache: true, affix: false},
                affix: true

            },
            {
                path: 'fatie',
                name: 'Fatie',
                component: () => import('@/views/tiezi/fatie'),
                meta: {title: '发贴', icon: 'send',noCache: true, affix: false},
                affix: true,
                hidden: true

            },
            {
                path: 'dingtiezi',
                name: 'Dingtiezi',
                component: () => import('@/views/tiezi/dingtiezi'),
                meta: {title: '置顶贴子', icon: 'zhiding',noCache: true, affix: false},
                affix: true,
                hidden: true
            },
            {
                path: 'refreshtiezi',
                name: 'Refreshtiezi',
                component: () => import('@/views/tiezi/refreshtiezi'),
                meta: {title: '刷新贴子', icon: 'shuaxin',noCache: true, affix: false},
                affix: true,
                hidden: true
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/index',
        name: '会员管理',
        meta: {title: '会员管理', icon: 'huiyuan21',noCache: true, affix: false},
        children: [
            {
                path: 'index',
                name: 'index',
                component: () => import('@/views/user/index'),
                meta: {title: '会员列表', icon: 'table',noCache: true, affix: false}

            },
            {
                path: 'usermessage',
                name: 'Usermessage',
                component: () => import('@/views/user/usermessage'),
                meta: {title: '会员资料', icon: '',noCache: true, affix: false},
                hidden: true
            },
            {
                path: 'vipuser',
                name: 'Vipuser',
                component: () => import('@/views/user/vipuser'),
                meta: {title: 'vip会员', icon: 'huiyuan1',noCache: true, affix: false}
            }
        ]
    },
    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: {title: 'Example', icon: 'example',noCache: true, affix: false},
        children: [
            {
                path: 'ActingMemberM',
                name: 'ActingMemberM',
                component: () => import('@/views/table/ActingMemberM'),
                meta: {title: 'Table', icon: 'email',noCache: true, affix: false}
            },
            {
                path: 'DisMembManagement',
                name: 'DisMembManagement',
                component: () => import('@/views/table/DisMembManagement'),
                meta: {title: '分销会员管理', icon: 'fenxiaohuiyuan',noCache: true, affix: false}
            },
            {
                path: 'Checkout',
                name: 'Checkout',
                component: () => import('@/views/table/Checkout'),
                meta: {title: 'Table', icon: 'email',noCache: true, affix: false}
            },
            {
                path: 'commissions',
                name: 'Commissions',
                component: () => import('@/views/table/commissions'),
                meta: {title: 'Table', icon: 'email',noCache: true, affix: false}
            },
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/table/index'),
                meta: {title: 'Table', icon: 'email',noCache: true, affix: false}
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () => import('@/views/tree/index'),
                meta: {title: 'Tree', icon: 'email',noCache: true, affix: false}
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Form',
                component: () => import('@/views/form/index'),
                meta: {title: 'Form', icon: 'form'}
            }
        ]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: {title: 'Menu1'},
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: {title: 'Menu1-1'}
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: {title: 'Menu1-2'},
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: {title: 'Menu1-2-1'}
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: {title: 'Menu1-2-2'}
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: {title: 'Menu1-3'}
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index'),
                meta: {title: 'menu2'}
            }
        ]
    },

    {
        path: 'external-link',
        component: Layout,
        children: [
            {
                path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
                meta: {title: 'External Link', icon: 'link'}
            }
        ]
    },

    // 404 page must be placed at the end !!!
    {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
    mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router