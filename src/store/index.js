import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import system from './modules/system/index'
import file from './modules/file/index'
import user from './modules/user/index'
import audit from './modules/audit/index'
import category from './modules/category/index'
import content from './modules/content/index'
import getters from './getters'
import banner from './modules/banner/index'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        audit,
        category,
        content,
        system,
        file,
        permission,
        banner
    },
    getters
})

export default store
