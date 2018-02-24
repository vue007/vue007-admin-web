import fetch from '@/utils/fetch'

const baseUrl = '/api/topic/';

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

export function recommend(data) {
    return fetch({
        url: baseUrl + 'recommend',
        method: 'post',
        data: {
            id: data.id,
            recommendId: data.recommendId
        }
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


