import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will no redirct in the levelbar
 * noDropdown : if `noDropdown:true` will has no submenu
 * meta : { role: ['admin'] }  will control the page role
 **/
export const constantRouterMap = [
    {path: '/login', component: _import('system/login/index'), hidden: true},
    {path: '/404', component: _import('errorPage/404'), hidden: true},
    {path: '/401', component: _import('errorPage/401'), hidden: true},
    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard/index',
        name: '首页',
        hidden: true,
        children: [{path: 'index', name: '首页', component: _import('dashboard/index')}]
    }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

export const asyncRouterMap = [
    {
        path: '',
        component: Layout,
        redirect: '/',
        name: '首页',
        icon: 'home',
        noDropdown: true,
        children: [{path: '', name: '首页', component: _import('dashboard/index')}]
    },
    {
        path: '/user',
        component: Layout,
        redirect: 'index',
        name: '用户管理',
        icon: 'user',
        meta: {role: ['admin']},
        noDropdown: true,
        children: [{path: 'index', component: _import('user/user/index'), name: '用户管理', meta: {role: ['admin']}}]
    },
    {
        path: '/system',
        component: Layout,
        redirect: 'admin',
        name: '系统管理',
        icon: 'system',
        meta: {role: ['admin']},
        children: [
            {path: 'admin', component: _import('system/admin/index'), name: '管理员', icon: 'admin', meta: {role: ['admin']}}
        ]
    },
    {path: '*', redirect: '/404', hidden: true}
]
