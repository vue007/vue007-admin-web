/**
 * 用户管理
 * 2017年11月7日17:32:42
 * Author: Xiangyang
 */
import {list, create, update, status} from '@/api/user/user'

const user = {
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

            userType: 99,

            keywords: ''
        },

        addDialog: false,
        editDialog: false,

        // 当前操作行
        operRow: {},

        helper: {
            selectHelperList: []
        }
    },

    mutations: {
        SET_LIST: (state, list) => {
            state.list = list;
        },
        SET_TOTAL: (state, total) => {
            state.total = total;
        },
        SET_PAGE: (state, page) => {
            state.searchData.pageNum = page[0];
            state.searchData.pageSize = page[1];
        },
        SET_PAGE_NUM: (state, pageNum) => {
            state.searchData.pageNum = parseInt(pageNum);
        },
        SET_PAGE_SIZE: (state, pageSize) => {
            state.searchData.pageSize = parseInt(pageSize);
        },
        SET_LOADING_SEARCH: (state, loading_search) => {
            state.loading_search = loading_search;
        },
        SET_LOADING_DIALOG: (state, loadingDialog) => {
            state.loadingDialog = loadingDialog;
        },
        SET_LOADING_TABLE: (state, loadingTable) => {
            state.loadingTable = loadingTable;
        },
        SET_SEARCH_DATA: (state, searchData) => {
            state.searchData = searchData;
        },
        SET_WITH_LOAD: (state, data) => {
            if (data) {
                state.list = data.list ? data.list : [];
                state.total = data.total ? data.total : 0;
                state.pageNum = data.pageNum ? data.pageNum : 1;
                state.pageSize = data.pageSize ? data.pageNum : 10;
            }
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
        },

        SEL_HELPER: (state, data) => {
            state.helper.selectHelperList = data.list ? data.list : [];
        }
    },

    actions: {
        getData({dispatch, commit, state}) {
            commit('SET_LOADING_TABLE', true);
            return new Promise((resolve, reject) => {
                list(state.searchData).then(response => {
                    const data = response.data;
                    commit('SET_WITH_LOAD', data);
                    commit('SET_LOADING_TABLE', false);
                    resolve()
                }).catch(error => {
                    commit('SET_LOADING_TABLE', false);
                    reject(error)
                })
            })
        },
        add({dispatch, commit, state}, data) {
            commit('SET_LOADING_DIALOG', true);
            return new Promise((resolve, reject) => {
                create(data).then(response => {
                    commit('SET_LOADING_DIALOG', false);
                    if (response.code === 2000) {
                        dispatch('getData');
                        dispatch('closeAddDialog');
                    }
                    resolve();
                }).catch(error => {
                    commit('SET_LOADING_DIALOG', false);
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
        },

        getSelectHelper({dispatch, commit, state}, userType) {
            return new Promise((resolve, reject) => {
                list({
                    userType: userType,
                    pageNum: $global.config.defPageNum,
                    pageSize: $global.config.selectHelperSize
                }).then(response => {
                    const data = response.data
                    commit('SEL_HELPER', data);
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    },
    getters: {}
};

export default user
