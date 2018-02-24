import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth'

const pathHiddenKey = '__hidden__';// 不需要提示的操作 url匹配
// axios config
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 全局的请求次数，请求的间隙
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;

// create axios
const service = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    withCredentials: false,        // 默认不传 cookie
    timeout: 5000                  // timeout
})

// request拦截器
service.interceptors.request.use(config => {
    if ( getToken() ) {
        config.headers['x-token'] = getToken() // 让每个请求携带token--['x-token']
    }
    if ( config.params && config.params['x-token'] ) { // 客户端预览 token 转存
        config.headers['x-token'] = config.params['x-token'];
    }
    return config
}, error => {
    let config = error.config;
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(error);
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
        // Reject with the error
        console.log('error' + error)// for debug
        Message({message: '网络异常！', type: 'error', duration: 2 * 1314});
        Promise.reject(error)
    }
    // Increase the retry count
    config.__retryCount += 1;
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
})

// respone拦截器
service.interceptors.response.use(
    response => {
        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
        //  */
        const data = response.data;
        if (data.code === 2000) {
            messageOperResponse(response);
            return response.data;
        } else {
            Message({message: data.message, type: 'error', duration: 2 * 1314});
            return Promise.reject('error');
        }
    },
    error => {
        console.log('err' + error)// for debug

        if (error.response && error.response.status === 405) {
            confirmResponse405();
        } else {
            messageResponseError(error);
        }
        return Promise.reject(error)
    }
)

const messageOperResponse = function(response) {
    if ( response.config.method !== 'get') {
        if ( response.config.url.indexOf(pathHiddenKey) !== -1 ) { // 不需要提示的请求
        } else {
            let str = '操作'

            if ( response.config.url.indexOf('/login') !== -1 ) str = '登录';
            if ( response.config.url.indexOf('/create') !== -1 ) str = '创建';
            if ( response.config.url.indexOf('/update') !== -1 ) str = '保存';

            Message({message: str + '成功！', type: 'success', duration: 1314});
        }
    }
}

const messageResponseError = function(error) {
    if ( error.code ) {
        switch (error.code) {
            case 'ECONNABORTED':
                Message({message: '连接超时!', type: 'error', duration: 1314});
                break;
            default:
                Message({message: error.message, type: 'error', duration: 2 * 1314});
        }

    } else if ( !error.response ) {
        Message({message: '网络异常!', type: 'error', duration: 1314});
    }
}

const confirmResponse405 = function() {
    MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning'})
        .then(() => {
            store.dispatch('system/login/FedLogOut').then(() => {
                location.reload();// 为了重新实例化vue-router对象 避免bug
            });
        })
}
// TODO 4001

export default service
