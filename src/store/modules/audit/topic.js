/**
 * 帖子管理模块
 * 2017-11-14 10:47:46
 * Author: Akai
 */
import {list, status} from '@/api/audit/topic'
import $global from '@/utils/global'

const admin = {
    namespaced: true,
    state: {
        list: [],
        total: 0,

        loadingSearch: false,
        loadingDialog: false,
        loadingTable: false,

        searchData: {
            pageNum: 0,
            pageSize: 10,

            keywords: '',
            status: $global.auditStatus.WAIT_AUDIT
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
        SET_PAGE_SIZE: (state, pageSize) => {
            state.searchData.pageSize = parseInt(pageSize);
        },
        SET_LOADING_SEARCH: (state, flag) => {
            state.loading_search = flag;
        },
        SET_LOADING_TABLE: (state, flag) => {
            state.loadingTable = flag;
        },
        SET_LOADING_DIALOG: (state, flag) => {
            state.loadingDialog = flag;
        },
        SET_ADD_DIALOG: (state, flag) => {
            state.addDialog = flag;
        },
        SET_UPDATE_DIALOG: (state, flag) => {
            state.editDialog = flag;
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
        status({dispatch, commit, state}, data) {
            return new Promise((resolve, reject) => {
                status(data).then(response => {
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
