import fetch from '@/utils/fetch'
import $global from '@/utils/global'

const baseUrl = '/api/user/audit/';

export function list(searchData) {
    searchData['type'] = $global.auditType.NICKNAME;
    return fetch({
        url: baseUrl,
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

