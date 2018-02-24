/**
 * 内容管理模块
 * 2017-11-14 10:45:32
 * Author: Akai
 */
import article from './article'
import topic from './topic'

const content_module = {
    namespaced: true,
    modules: {
        article,
        topic
    }
};

export default content_module
