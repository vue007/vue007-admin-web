[![](https://avatars1.githubusercontent.com/u/34916802?s=200&raw=true)](https://github.com/vue007/vue007-admin-web)
# vue007-admin-web # [![]在线示例:http://admin.vue007.tech](http://admin.vue007.tech)
[![vue](https://img.shields.io/badge/vue-2.5.13-brightgreen.svg)](https://github.com/vuejs/vue)
[![vuex](https://img.shields.io/badge/vuex-3.0.0-brightgreen.svg)](https://github.com/vuejs/vuex)
[![vue-router](https://img.shields.io/badge/vue-router2.7.0-brightgreen.svg)](https://github.com/vuejs/vue-router)
[![element-ui](https://img.shields.io/badge/element--ui-2.0.11-brightgreen.svg)](https://github.com/ElemeFE/element)



## 前言
> 此项目是运营后台的前端部分

 **该项目不支持低版本游览器(如ie)，有需求请自行添加polyfill [详情](https://github.com/PanJiaChen/vue-element-admin/wiki#babel-polyfill)**


## 功能
- 登录/注销
- 面包屑
- 导航
- 401，404错误页面
- 错误日志
- 多环境发布
- dashboard
- 二次登录
- 动态侧边栏（支持多级路由）
- screenfull
- views-tab

## 开发
```bash
    # 克隆项目
    
    # 安装依赖
    npm install
    //or # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org

    # 本地开发 开启服务
    npm run dev
```
浏览器访问 http://localhost:9527

## 发布
```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:test

    # 构建生成环境
    npm run build:prod
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 静态资源
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 状态管理
后台只有user和app配置相关状态使用vuex存在全局，其它数据都由每个业务页面自己管理。

## License

MIT
