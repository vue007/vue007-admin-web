/**
 * 管理员
 * 2017-11-01 14:04:21
 * Author: Akai
 */
import {list, create, update, flag} from '@/api/system/admin'

import utils from '@/utils/index'
import global from '@/utils/global'

const admin = {
    namespaced: true,
    state: {
        list: [],
        selectHelperList: [],
        total: 0,

        loadingSearch: false,
        loadingDialog: false,
        loadingTable: false,

        searchData: {
            pageNum: 0,
            pageSize: 10,

            keywords: ''
        },

        addDialog: false,
        editDialog: false,

        // 当前操作行
        operRow: {}
    },

    mutations: {
        SET_WITH_LOAD: (state, data) => {
            if (data) {
                state.list = data.list ? data.list : [];
                state.total = data.total ? data.total : 0;
                state.pageNum = data.pageNum ? data.pageNum : 1;
                state.pageSize = data.pageSize ? data.pageNum : 10;
            }
        },
        SEL_SELECT_HELPER_LIST: (state, list) => {
            state.selectHelperList = list;
        },
        SET_PAGE_SIZE: (state, pageSize) => {
            state.searchData.pageSize = parseInt(pageSize);
        },
        SET_LOADING_SEARCH: (state, loading_search) => {
            state.loading_search = loading_search;
        },
        SET_LOADING_TABLE: (state, loadingTable) => {
            state.loadingTable = loadingTable;
        },
        SET_LOADING_DIALOG: (state, loadingDialog) => {
            state.loadingDialog = loadingDialog;
        },
        SET_ADD_DIALOG: (state, addDialog) => {
            state.addDialog = addDialog;
        },
        SET_UPDATE_DIALOG: (state, editDialog) => {
            state.editDialog = editDialog;
        },
        SET_OPER_ROW: (state, operRow) => {
            state.operRow = operRow;
        },
        DEL: (state, i) => {
            state.tableData.list.splice(i);
        }
    },

    actions: {
        getData({dispatch, commit, state}) {
            commit('SET_LOADING_TABLE', true);
            return new Promise((resolve, reject) => {
                list(state.searchData).then(response => {
                    const data = response.data
                    commit('SET_WITH_LOAD', data);
                    commit('SET_LOADING_TABLE', false);
                    resolve()
                }).catch(error => {
                    commit('SET_LOADING_TABLE', false);
                    reject(error)
                })
            })
        },
        getSelectHelper({dispatch, commit, state}) {
            return new Promise((resolve, reject) => {
                list({
                    pageNum: global.config.defPageNum,
                    pageSize: global.config.selectHelperSize
                }).then(response => {
                    const data = response.data
                    commit('SEL_SELECT_HELPER_LIST', data.list ? data.list : []);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        add({dispatch, commit, state}, data) {
            return new Promise((resolve, reject) => {
                create(data).then(response => {
                    if (response.code === 2000) {
                        dispatch('getData');
                        dispatch('closeAddDialog');
                    }
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        edit({dispatch, commit, state}, data) {
            return new Promise((resolve, reject) => {
                update(data).then(response => {
                    if (response.code === 2000) {
                        dispatch('getData');
                        dispatch('closeEditDialog');
                    }
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        flag({dispatch, commit, state}, data) {
            return new Promise((resolve, reject) => {
                flag(data).then(response => {
                    if (response.code === 2000) {
                        dispatch('getData');
                    }
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        changePageSize({commit, state}, pageSize) {
            commit('SET_PAGE_SIZE', pageSize);
        },
        closeAddDialog({commit}, row) {
            commit('SET_ADD_DIALOG', false);
        },
        openAddDialog({commit}, row) {
            commit('SET_ADD_DIALOG', true);
        },
        closeEditDialog({commit}, row) {
            commit('SET_UPDATE_DIALOG', false);
        },
        openEditDialog({commit}, row) {
            commit('SET_OPER_ROW', row);
            commit('SET_UPDATE_DIALOG', true);
        }
    },
    getters: {}
}

export default admin
