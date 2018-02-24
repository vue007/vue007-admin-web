import fetch from '@/utils/fetch'

const baseUrl = '/api/file/upload/';

export function STSToken(searchData) {
    return fetch({
        url: baseUrl + 'STSToken',
        method: 'get',
        params: searchData
    })
}

export function create(data) {
    return fetch({
        method: 'post',
        url: baseUrl + '/create' + '?__hidden__',
        noMessage: true,
        data: data
    })
}
