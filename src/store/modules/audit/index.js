/**
 * audit 审核模块
 * 2017年11月7日17:26:54
 * Author: Xiangyang
 */
import headimg from './headimg'
import nickname from './nickname'
import topic from './topic'

const audit_module = {
    namespaced: true,
    modules: {
        headimg,
        nickname,
        topic
    }
};

export default audit_module
