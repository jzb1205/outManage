import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

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
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', icon: 'el-icon-house' }
      }
    ]
  },

  {
    path: '/outCompanyInfo',
    component: Layout,
    name: '外包公司信息',
    meta: { title: '外包公司信息', icon: 'el-icon-office-building' },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/views/outCompanyInfo/index'),
        meta: { title: '外包公司信息' }
      }
    ]
  },

  {
    path: '/event',
    component: Layout,
    redirect: '/event/list',
    name: '事件单管理',
    meta: { title: '事件单管理', icon: 'el-icon-message-solid' },
    children: [
      {
        path: 'list',
        name: '事件单列表',
        component: () => import('@/views/event/index'),
        meta: { title: '事件单列表' }
      },
      {
        path: 'detail',
        name: '详情页面',
        component: () => import('@/views/event/detail'),
        meta: { title: '详情页面' }
      }
    ]
  },

  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/list',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'list',
        name: '用户管理',
        component: () => import('@/views/userManage/index'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid' }
      }
    ]
  },

  {
    path: '/equipmentManage',
    component: Layout,
    redirect: '/equipmentManage/equipmentInfo',
    name: '设备管理',
    meta: { title: '设备管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'equipmentInfo',
        name: '设备信息',
        component: () => import('@/views/equipmentManage/equipmentInfo'),
        meta: { title: '设备信息' }
      },
      {
        path: 'outInInfo',
        name: '出入库信息',
        component: () => import('@/views/equipmentManage/outInInfo'),
        meta: { title: '出入库信息' }
      }
    ]
  },
  {
    path: '/fileManage',
    component: Layout,
    redirect: '/fileManage/list',
    name: '文件管理',
    meta: { title: '文件管理', icon: 'el-icon-folder-opened' },
    children: [
      {
        path: 'list',
        name: '文件管理',
        component: () => import('@/views/fileManage/index'),
        meta: { title: '文件管理' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export default router
