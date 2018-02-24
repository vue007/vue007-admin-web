/**
 * 分类模块
 * 2017-11-10 10:50:15
 * Author: Akai
 */
import article from './article'
import topic from './topic'

const category_module = {
    namespaced: true,
    modules: {
        article,
        topic
    }
};

export default category_module
