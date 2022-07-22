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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
// 静态路由
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
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 动态路由
const asyncRoutes = [
  // 主页面
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  // 用户管理
  {
    path: '/example',
    component: Layout,
    name: 'Example',
    alwaysShow: true,
    meta: { title: '用户管理', icon: 'el-icon-s-custom' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '用户列表', icon: 'el-icon-menu' }
      }
    ]
  },
  // 权限管理
  {
    path: '/power',
    component: Layout,
    name: 'Power',
    meta: { title: '权限管理', icon: 'el-icon-s-help' },
    children: [

      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/role/index'),
        meta: { title: '角色列表', icon: 'el-icon-menu' }
      },
      {
        path: 'manage',
        name: 'Manage',
        component: () => import('@/views/manage/index'),
        meta: { title: '权限管理', icon: 'el-icon-menu' }
      }
    ]
  },
  // 商品管理
  {
    path: '/shopping',
    component: Layout,
    name: 'Shopping',
    meta: {
      title: '商品管理',
      icon: 'el-icon-s-cooperation'
    },
    children: [
      {
        path: 'shop1',
        component: () => import('@/views/shopping/shop1/index'), // Parent router-view
        name: 'Shop1',
        meta: { title: '商品列表', icon: 'el-icon-menu' }
      },
      {
        path: 'shop2',
        component: () => import('@/views/shopping/shop2/index'),
        name: 'Shop2',
        meta: { title: '分类参数', icon: 'el-icon-menu' }
      }, {
        path: 'shop3',
        component: () => import('@/views/shopping/shop3/index'), // Parent router-view
        name: 'Shop3',
        meta: { title: '商品分类', icon: 'el-icon-menu' }
      }
    ]
  },
  // 订单管理
  {
    path: '/order',
    component: Layout,
    name: 'Order',
    // 总是展示， 用来处理菜单下只有一个展示子项的时候子项会替代父菜单的情况
    alwaysShow: true,
    meta: {
      title: '订单管理',
      icon: 'el-icon-s-order'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/list/index'), // Parent router-view
        name: 'List',
        meta: { title: '订单列表', icon: 'el-icon-menu' }
      }
    ]
  },
  // 数据统计
  {
    path: '/data',
    component: Layout,
    name: 'Data',
    // 总是展示， 用来处理菜单下只有一个展示子项的时候子项会替代父菜单的情况
    alwaysShow: true,
    meta: {
      title: '数据统计',
      icon: 'el-icon-s-marketing'
    },
    children: [
      {
        path: 'statistics',
        component: () => import('@/views/statistics/index'), // Parent router-view
        name: 'Statistics',
        meta: { title: '数据统计', icon: 'el-icon-menu' }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  // 整合
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
