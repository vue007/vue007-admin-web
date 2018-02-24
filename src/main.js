import Vue from 'vue'
import ElementUI from 'element-ui'
import './element-variables.scss'
import App from './App'
import router from './router'
import store from './store'
import Icon from 'vue-svg-icon/Icon'
import './errorLog'// error log
import './permission' // 权限
import * as filters from '@/utils/filters' // 全局filter
import utils from '@/utils/index' // 全局filter
import global from '@/utils/global' // 全局filter

// -----------begin mobile UI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
// -----------end mobile UI

// import _ from 'lodash'

window._ = require('lodash');// 全局引入 优点->方便 缺点 -> 很多 不支持服务端渲染
Vue.prototype._ = _;

Vue.use(ElementUI);
Vue.component('icon', Icon);

// add global helper (util & global data)
Vue.prototype.$utils = utils;
window.$utils = utils;// 全局引入 优点->方便 缺点 -> 很多 不支持服务端渲染
Vue.prototype.$global = global;
window.$global = global;// 全局引入 优点->方便 缺点 -> 很多 不支持服务端渲染

// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
