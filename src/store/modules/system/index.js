/**
 * system 系统模块
 * 2017-11-01 14:40:48
 * Author: Akai
 */
import admin from './admin'
import login from './login'

const system_module = {
    namespaced: true,
    modules: {
        admin,
        login
    }
}

export default system_module
