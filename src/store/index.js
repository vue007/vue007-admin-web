import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import system from './modules/system/index'
import user from './modules/user/index'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        system,
        permission
    },
    getters
})

export default store
