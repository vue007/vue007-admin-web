import fetch from '@/utils/fetch'

const baseUrl = '/api/topic/';

export function list(searchData) {
    return fetch({
        url: baseUrl + 'list',
        method: 'get',
        params: searchData
    })
}

export function status(data) {
    return fetch({
        url: baseUrl + 'status',
        method: 'post',
        data: data
    })
}

