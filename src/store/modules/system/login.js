/**
 * 管理员
 * 2017-11-01 14:04:21
 * Author: Akai
 */
import {loginByUsername, logout, getAdminInfo} from '@/api/system/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

import headImg from '@/assets/images/head-img-default.gif'

const login = {
    namespaced: true,
    state: {
        nickname: '',
        username: '',
        password: '',
        status: '',
        token: getToken(),
        avatar: '',

        roles: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NICKNAME: (state, nickname) => {
            state.nickname = nickname
        },
        SET_USERNAME: (state, username) => {
            state.username = username
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({commit}, adminInfo) {
            const username = adminInfo.username.trim()
            return new Promise((resolve, reject) => {
                loginByUsername(username, adminInfo.password).then(response => {
                    const data = response.data
                    setToken(data.token);
                    commit('SET_TOKEN', data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },

        // 获取用户信息
        GetAdminInfo({commit, state}) {
            return new Promise((resolve, reject) => {
                getAdminInfo(state.token).then(response => {
                    const data = response.data
                    commit('SET_ROLES', ['admin']);
                    commit('SET_NICKNAME', data.nickname);
                    commit('SET_USERNAME', data.username);
                    commit('SET_AVATAR', headImg);// 默认图片
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        LoginByPreview({commit}, data) {
            return new Promise((resolve, reject) => {
                setToken(data.token);
                commit('SET_TOKEN', data.token);
                commit('SET_NICKNAME', data.nickname);
                commit('SET_USERNAME', data.username);
                commit('SET_AVATAR', headImg);// 默认图片
                resolve();
            })
        },
        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                removeToken()
                resolve()
            })
        }
    }
}

export default login
