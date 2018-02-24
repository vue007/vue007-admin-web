/* eslint-disable space-before-function-paren */
// import Cookies from 'js-cookie'

const TokenKey = 'x-token'

export function getToken() {
    return window.localStorage.getItem(TokenKey)
}

export function setToken(token) {
    return window.localStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return window.localStorage.removeItem(TokenKey)
}
