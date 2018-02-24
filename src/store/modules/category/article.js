/* eslint-disable no-undef */
/**
 * 资讯分类
 * 2017-11-10 17:35:17
 * Author: Akai
 */
import {list, create, update, sort, flag} from '@/api/category/article'

import utils from '@/utils/index'
import global from '@/utils/global'

const article = {
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

            categoryType: global.articleType.IMAGE_TEXT,
            keywords: ''
        },

        addDialog: false,
        editDialog: false,
        sortDialog: false,

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
        SET_SORT_LIST: (state, list) => {
            state.sortList = list;
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
        SET_SORT_DIALOG: (state, flag) => {
            state.sortDialog = flag;
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
        getSelectHelper({dispatch, commit, state}, data) {
            return new Promise((resolve, reject) => {
                list({
                    categoryType: data,
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
        getSortList({dispatch, commit, state}) {
            return new Promise((resolve, reject) => {
                list({
                    categoryType: state.searchData.categoryType,
                    pageSize: 100
                }).then(response => {
                    const data = response.data
                    commit('SET_SORT_LIST', data.list ? data.list : []);
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
        sort({dispatch, commit, state}, data) {
            return new Promise((resolve, reject) => {
                sort(data).then(response => {
                    if (response.code === 2000) {
                        dispatch('getData');
                        dispatch('closeSortDialog');
                    }
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        flag({dispatch, commit, state}, data) {
            data.flag = utils.toggleFlag(data.flag);
            return new Promise((resolve, reject) => {
                flag(data).then(response => {
                    if (response.code === 2000) {
                        // dispatch('getData'); 删除后将不再展示，所以不刷新已提供一次
                    }
                    resolve();
                }).catch(error => {
                    data.flag = utils.toggleFlag(data.flag);
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
        openSortDialog({commit}, row) {
            commit('SET_SORT_DIALOG', true);
        },
        closeSortDialog({commit}, row) {
            commit('SET_SORT_DIALOG', false);
        }

    },
    getters: {}
}

export default article
