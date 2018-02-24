/* eslint-disable require-yield */
/**
 * 管理员
 * 2017-11-01 14:04:21
 * Author: Akai
 */
import {STSToken, create} from '@/api/file/upload'

import utils from '@/utils/index'
import global from '@/utils/global'
import OSS from 'ali-oss/lib/browser'

const upload = {
    namespaced: true,
    state: {
        uploadList: [],
        uploadedList: [],

        ossClient: {},
        uploading: false,
        loadingTable: false,
        count: 0,
        // 当前操作行
        operRow: {}
    },

    mutations: {
        SET_UPLOAD_LIST: (state, uploadList) => {
            state.uploadList = uploadList;
        },
        PUSH_UPLOAD_LIST: (state, file) => {
            state.uploadList.push(file);
        },
        SHIFT_UPLOAD_LIST: (state) => {
            state.uploadList.shift();
        },
        PUSH_UPLOADED_LIST: (state, file) => {
            state.uploadedList.push(file);
        },
        SET_LOADING_TABLE: (state, loadingTable) => {
            state.loadingTable = loadingTable;
        },
        SET_IS_UPLOADING: (state, flag) => {
            state.uploading = flag;
        },
        SET_OPER_ROW: (state, operRow) => {
            state.operRow = operRow;
        },
        DEL: (state, i) => {
            state.tableData.list.splice(i);
        }
    },

    actions: {
        addFile({dispatch, commit, state}, file) {
            // 添加附加上传信息
            file['progress'] = 0;
            let upload = _.extend({}, {
                file: file,
                progress: 0,
                acl: file.acl ? file.acl + '' : global.ossAcl.PUBLIC_READ, // 默认只读
                status: 'ready',
                uploading: false,
                ossResult: {}
            })
            commit('PUSH_UPLOAD_LIST', upload);

            // console.log('list', state.uploadList);
            dispatch('start');
        },
        add({dispatch, commit, state}, upload) { // 将oss文件信息入库
            // console.log('upload_ready for save ', upload)
            return new Promise((resolve, reject) => {
                create({
                    name: formatFileName(upload.file.name),
                    url: upload.ossResult.res.requestUrls[0],
                    path: upload.ossResult.name,
                    acl: upload.file.acl,
                    size: upload.file.size,
                    mimeType: upload.file.type,
                    sourceType: global.uploadSourceType.DEFAULT
                }).then(response => {
                    if (response.code === 2000) {
                        // 上传完成 开始上传下一个
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(error => {
                    reject(error);
                })
            })
        },
        async getSTSToken({dispatch, commit, state}, upload) { // 将oss文件信息入库
            console.log('upload_ready for save ', upload)
            return await new Promise((resolve, reject) => {
                STSToken().then(response => {
                    if (response.code === 2000) {
                        let result = response.data;
                        state.ossClient = new OSS.Wrapper({
                            accessKeyId: result.accessKeyId,
                            accessKeySecret: result.accessKeySecret,
                            stsToken: result.securityToken,
                            bucket: result.bucket,
                            endpoint: result.endpoint
                        });
                        resolve(upload);
                    } else {
                        reject();
                    }
                }).catch(error => {
                    reject(error);
                })
            })
        },
        async ossUpload({dispatch, commit, state}, upload) { // 将oss文件信息入库
            // console.log('upload_ready for save ', upload)
            return await new Promise((resolve, reject) => {
                state.ossClient.multipartUpload(getFilePath(upload.file), upload.file, {
                    headers: {
                        'x-oss-object-acl': utils.getStatusFromMap(global.ossAclMap, upload.acl)
                    },
                    progress: function (p) { // 进度
                        return function (done) {
                            console.log('add', p, upload.file);
                            upload.progress = parseInt(p * 100);
                            done();
                        }
                    }
                }).then(function (result) { // 上传完成
                    upload.ossResult = result;
                    upload.uploading = false;
                    upload.status = 'success';
                    resolve(upload);
                }).catch(function (error) { // 上传失败
                    console.log(error);
                    upload.uploading = false;
                    upload.status = 'exception';
                    reject(error);
                });
            })
        },
        async upload({dispatch, commit, state}, upload) {
            // dispatch('getSTSToken', upload).then( upload => {
            //     dispatch('ossUpload', upload).then( upload => {
            //         state.uploadList.shift();
            //         dispatch('start');
            //     })
            // })
            let upload_2 = await dispatch('getSTSToken', upload);
            let upload_3 = await dispatch('ossUpload', upload_2);
            await commit('SHIFT_UPLOAD_LIST');
            await dispatch('start');
        },
        start({dispatch, commit, state}) {
            commit('SET_IS_UPLOADING', true);
            if (state.uploadList.length) {
                dispatch('upload', state.uploadList[0])
            } else { // 上传完毕
                commit('SET_IS_UPLOADING', false);
            }
        },
        stop({dispatch, commit, state}, uploadList) {

        },
        getData({dispatch, commit, state}) {
            // commit('SET_LOADING_TABLE', true);
            // return new Promise((resolve, reject) => {
            //     list(state.searchData).then(response => {
            //         const data = response.data
            //         commit('SET_WITH_LOAD', data);
            //         commit('SET_LOADING_TABLE', false);
            //         resolve()
            //     }).catch(error => {
            //         commit('SET_LOADING_TABLE', false);
            //         reject(error)
            //     })
            // })
        }
    },
    getters: {}
}

export default upload


// private util function
const pathPrefix = function (fileType) {
    return fileType.substring(0, fileType.indexOf('/'));
}
const pathSuffix = function (fileName) {
    return fileName.substring((fileName.lastIndexOf('.') + 1), fileName.length);
}
const formatFileName = function (fileName) {
    return fileName.substring(0, fileName.lastIndexOf('.'));
}
const getFilePath = function (file) {
    let uploadPath = '/test007/';
    uploadPath += pathPrefix(file.type) + '/';
    uploadPath += new Date().getTime() + '.';
    uploadPath += pathSuffix(file.name);
    return uploadPath;
}
