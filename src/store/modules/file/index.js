/**
 * system 系统模块
 * 2017-11-01 14:40:48
 * Author: Akai
 */
import upload from './upload'
import info from './info'
import finder from './finder'

const upload_module = {
    namespaced: true,
    modules: {
        upload, info, finder
    }
};

export default upload_module
