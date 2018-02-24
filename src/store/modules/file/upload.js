/* eslint-disable require-yield */
/**
 * 上传模块
 * 2017-11-01 14:04:21
 * Author: Akai
 */
import {STSToken, create} from '@/api/file/upload'

import utils from '@/utils/index'
import global from '@/utils/global'
import OSS from 'ali-oss/lib/browser'
import uuid from 'uuid'

const upload = {
    namespaced: true,
    state: {
        uploadList: [],
        uploadedList: [],
        uploading: false,
        status: 'uploading'
    },

    mutations: {
        SET_UPLOAD_LIST: (state, uploadList) => {
            state.uploadList = uploadList;
        },
        PUSH_UPLOAD_LIST: (state, file) => {
            state.uploadList.push(file);
        },
        PUSH_UPLOADED_LIST: (state, file) => {
            state.uploadedList.push(file);
        },
        SET_UPLOADING: (state, flag) => {
            state.uploading = flag;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        }
    },

    // 上传流程 addFile -> start -> upload -> add
    // 添加文件 -> 自动开始上传队列 -> 上传 阿里oss -> 信息存库
    actions: {
        addFile({dispatch, commit, state}, file) {
            // 添加附加上传信息
            file['progress'] = 0;
            let upload = _.extend({}, {
                file: file,
                progress: 0,
                acl: file.acl ? file.acl + '' : utils.getStatusFromMap(global.ossAcl.PUBLIC_READ), // 默认只读
                status: 'ready',
                uploading: false,
                ossResult: {},
                saveUpload: {}// 上传完成后数据id
            })
            if ( file.queueUpload ) {
                commit('PUSH_UPLOAD_LIST', upload);
                commit('SET_STATUS', 'uploading');
                dispatch('start'); // 开始批量上传
            } else {
                dispatch('upload', upload);
            }
        },
        start({dispatch, commit, state}) {
            let upload = state.uploadList[0];
            if (state.uploadList.length !== 0) {
                if ( !upload.uploading ) { // 开始新上传
                    upload.uploading = true;
                    commit('SET_UPLOADING', true);
                    dispatch('upload', upload)
                }
                // 持续维持上传心跳 直到全部上传完成
                setTimeout( () => {
                    dispatch('start')
                }, 1000)
            } else { // 上传完毕
                commit('SET_UPLOADING', false);
                commit('SET_STATUS', 'uploaded');
            }
        },
        upload({dispatch, commit, state}, upload) {
            console.log('file', upload.file)
            upload.status = '';
            new Promise((resolve, reject) => {
                STSToken().then(response => {
                    let result = response.data;

                    var client = new OSS.Wrapper({
                        accessKeyId: result.accessKeyId,
                        accessKeySecret: result.accessKeySecret,
                        stsToken: result.securityToken,
                        bucket: result.bucket,
                        endpoint: result.endpoint
                    });
                    client.multipartUpload(getFilePath(upload.file), upload.file, {
                        headers: {'x-oss-object-acl': upload.acl},
                        progress: function (p) { // 进度
                            return function (done) {
                                console.log('add', p, upload.file);
                                upload.progress = parseInt(p * 100);
                                done();
                            }
                        }
                    }).then(function (result) {
                        upload.ossResult = result;
                        upload.status = 'success';
                        dispatch('add', upload)
                    }).catch(function (error) { // 上传失败
                        console.log(error);
                        upload.uploading = false;
                        upload.status = 'exception';
                        reject(error);
                    });
                    resolve();
                }).catch(error => { // 获取sts token 失败
                    console.log(error);
                    upload.uploading = false;
                    upload.status = 'exception';
                    reject(error);
                })
            })
        },
        add({dispatch, commit, state}, upload) { // 将oss文件信息入库
            console.log('upload_ready for save ', upload)
            return new Promise((resolve, reject) => {
                create({
                    name: formatFileName(upload.file.name),
                    url: fromatUrl(upload.ossResult.res.requestUrls[0]),
                    path: upload.ossResult.name,
                    acl: utils.getValueByLabel(global.ossAclMap, upload.file.acl),
                    size: upload.file.size,
                    mimeType: upload.file.type,
                    sourceType: upload.file.sourceType ? upload.file.sourceType : global.uploadSourceType.DEFAULT
                }).then(response => {
                    if (response.code === 2000) {
                        upload.uploading = false;
                        upload.saveUpload = _.merge({}, response.data);
                        if ( upload.file.queueUpload ) { // 上传完成 开始上传下一个
                            commit( 'PUSH_UPLOADED_LIST', state.uploadList.shift() );
                        } else { // 非自动上传 进行回调
                            upload.file.successCallback(upload);
                        }
                        resolve();
                    } else {
                        reject();
                    }
                }).catch(error => {
                    reject(error);
                })
            })
        },
        stop({dispatch, commit, state}, uploadList) {

        },
        getData({dispatch, commit, state}) {
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
const fromatUrl = function (url) {
    let end = url.indexOf('?');
    if ( end === -1 ) return url;
    return url.substring(0, end);
}
const getFilePath = function (file) {
    let uploadPath = global.config.ossBasePath;
    uploadPath += pathPrefix(file.type) + '/';
    uploadPath += uuid() + '.';
    uploadPath += pathSuffix(file.name);
    return uploadPath;
}
