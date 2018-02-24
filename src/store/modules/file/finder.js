/**
 * 上传文件管理
 * 2018-01-12 09:44:44
 * Author: Akai
 */
import {list, create, update, flag} from '@/api/file/info'

import utils from '@/utils/index'
import global from '@/utils/global'

const finder = {
    namespaced: true,
    state: {
        list: [],
        selectionList: [],
        currentSelect: {},
        total: 0,

        multiple: true,

        loadingSearch: false,
        loadingDialog: false,
        loadingTable: false,
        searchData: {
            pageNum: 0,
            pageSize: 10,

            createAdmin: '',
            mimeType: '',
            keywords: ''
        },

        dialog: false,
        addDialog: false,
        editDialog: false,

        // 当前操作行
        operRow: {}

    },

    mutations: {
        SET_LIST: (state, list) => {
            state.list = list;
        },
        SET_SELECTION_LIST: (state, selectionList) => {
            state.selectionList = selectionList;
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
        SET_DIALOG: (state, flag) => {
            state.dialog = flag;
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
        changeSelectionList({dispatch, commit, state}, selection) {
            // 通过已选择 挑选出 未选择的部分
            let notSelection = _.differenceBy( state.list, selection, 'id' );
            console.log(notSelection)

            // 删除未选择 已选部分
            // state.selectionList = _.assign([], _.pullAllBy(_.assign([], state.selectionList), notSelection));
            _.forEach(notSelection, rmItem => {
                let index = _.findIndex(state.selectionList, rmItem);
                if ( index !== -1 ) {
                    let temp = _.assign([], state.selectionList);
                    temp.splice(index, index + 1);
                    state.selectionList = _.assign([], temp);
                    console.log('remove item', rmItem)
                }
            });

            // 选择部分如不存在 则添加到选择队列 (state.selectionList)
            let addList = _.differenceBy( selection, state.selectionList, 'id' );
            console.log('新增部分', addList)

            _.forEach(addList, addItem => {
                let index = _.findIndex(state.selectionList, addItem);
                if ( index === -1 ) {
                    state.selectionList.push(addItem);
                    console.log('add item', addItem)
                }
            });
            console.log('已选择：-> ', state.selectionList);
        },
        changeCurrentSelect({dispatch, commit, state}, selectRow) {
            state.currentSelect = _.assign({}, selectRow);
        },
        initFinder({dispatch, commit, state}) {
            state.selectionList = _.assign([], []);
            state.currentSelect = _.assign([], []);

            commit('SET_PAGE', [0, 10]);
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
        closeDialog({commit}, row) {
            commit('SET_DIALOG', false);
        },
        openDialog({commit}, row) {
            commit('SET_DIALOG', true);
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
};

export default finder
