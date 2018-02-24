import fetch from '@/utils/fetch'

const baseUrl = '/api/topic/category/';

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
            id: data.id,
            flag: data.flag
        }
    })
}


