import fetch from '@/utils/fetch'

const baseUrl = '/api/banner/slider/';

export function list(searchData) {
    return fetch({
        url: baseUrl + 'list',
        method: 'get',
        params: searchData
    })
}

export function create(data) {
    return fetch({
        method: 'post',
        url: baseUrl + 'create',
        data: data
    })
}

export function update(data) {
    return fetch({
        url: baseUrl + 'update',
        method: 'post',
        data: data
    })
}

export function sort(data) {
    console.log(data)
    return fetch({
        url: baseUrl + 'sort',
        method: 'post',
        data: data
    })
}

export function flag(data) {
    return fetch({
        url: baseUrl + 'flag',
        method: 'post',
        data: {
            sliderId: data.sliderId,
            flag: data.flag
        }
    })
}

