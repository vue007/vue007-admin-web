import fetch from '@/utils/fetch'

export function loginByUsername(username, password) {
    const data = {
        username,
        password
    }
    return fetch({
        url: '/login',
        method: 'post',
        data
    })
}

export function logout() {
    return fetch({
        url: '/logout',
        method: 'post'
    })
}

export function getAdminInfo() {
    return fetch({
        url: '/api/login/info',
        method: 'get'
    })
}

