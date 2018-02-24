import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

Vue.use(Router)

/* layout */
import Layout from '../views/layout/Layout'

/* mobile preview Layout */
import MobileLayout from '../views/mobile/layout/Layout'

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
        path: '/audit',
        component: Layout,
        redirect: false,
        name: '审核信息',
        icon: 'audit',
        meta: {role: ['admin']},
        children: [
            {path: 'head_img', component: _import('audit/headimg/index'), name: '用户头像', icon: 'head-img', meta: {role: ['admin']}},
            {path: 'nickname', component: _import('audit/nickname/index'), name: '用户昵称', icon: 'nickname', meta: {role: ['admin']}},
            {path: 'topic', component: _import('audit/topic/index'), name: '论坛审核', icon: 'bbs', meta: {role: ['admin']}}
        ]
    },
    {
        path: '/category',
        component: Layout,
        redirect: 'index',
        name: '分类管理',
        icon: 'category',
        meta: {role: ['admin']},
        noDropdown: false,
        children: [
            {path: 'article', component: _import('category/article/index'), name: '分类管理', icon: 'article-category', meta: {role: ['admin']}},
            {path: 'topic', component: _import('category/topic/index'), name: '帖子话题', icon: 'topic-category', meta: {role: ['admin']}}
        ]
    },
    {
        path: '/content',
        component: Layout,
        redirect: 'article',
        name: '内容管理',
        icon: 'content',
        meta: {role: ['admin']},
        children: [
            {path: 'banner', component: _import('banner/slider/index'), name: 'Banner', icon: 'banner', meta: {role: ['admin']}},
            {path: 'article', component: _import('content/article/index'), name: '内容管理', icon: 'post', meta: {role: ['admin']}},
            {path: 'topic', component: _import('content/topic/index'), name: '帖子管理', icon: 'news', meta: {role: ['admin']}},
            {path: 'add_article', component: _import('content/article/Add'), name: '内容创建', icon: 'create-file', meta: {role: ['admin']}},
            {path: 'edit_article', hidden: true, component: _import('content/article/Edit'), name: ' 内容修改', icon: 'create-file', meta: {role: ['admin']}}
        ]
    },
    {
        path: '/file',
        component: Layout,
        redirect: 'file',
        name: '文件管理',
        icon: 'file-manage',
        meta: {role: ['admin']},
        children: [
            {path: 'index', component: _import('file/info/index'), name: '文件管理', icon: 'finder-m', meta: {role: ['admin']}},
            {path: 'upload', component: _import('file/upload/index'), name: '文件上传', icon: 'upload', meta: {role: ['admin']}}
        ]
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
    {path: '*', redirect: '/404', hidden: true},
    //
    //
    //
    // 以下为特殊 mobile 预览模块
    {
        path: '/mobile',
        component: MobileLayout,
        redirect: false,
        hidden: true,
        children: [
            {path: '/', component: _import('mobile/home/index'), name: '主页'},
            {path: 'article/previewContent', component: _import('mobile/article/previewContent'), name: '预览'}
        ]
    }
]
