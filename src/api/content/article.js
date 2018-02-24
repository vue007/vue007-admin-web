import fetch from '@/utils/fetch'
import global from '@/utils/global'
import utils from '@/utils/index'

const baseUrl = '/api/article/';

const typePathMap = [
    { value: global.articleType.IMAGE_TEXT, label: ''},
    { value: global.articleType.VIDEO, label: ''},
    { value: global.articleType.WALLPAPER, label: 'wallpaper/'}
];

export function list(searchData) {
    return fetch({
        url: baseUrl + utils.getLabelByValue(typePathMap, searchData.categoryType) + 'list',
        method: 'get',
        params: searchData
    })
}

export function detail(data) {
    console.log(data, 'adfgaergwerterwt', utils.getLabelByValue(typePathMap, data.categoryType));
    return fetch({
        url: baseUrl + utils.getLabelByValue(typePathMap, data.categoryType) + 'info',
        method: 'get',
        params: {
            id: data.id
        }
    })
}

export function create(data) {
    return fetch({
        method: 'post',
        url: baseUrl + utils.getLabelByValue(typePathMap, data.categoryType) + 'create',
        data: data
    })
}

export function update(data) {
    return fetch({
        url: baseUrl + utils.getLabelByValue(typePathMap, data.categoryType) + 'update',
        method: 'post',
        data: data
    })
}
export function recommend(data) {
    return fetch({
        url: baseUrl + utils.getLabelByValue(typePathMap, data.categoryType) + 'recommend',
        method: 'post',
        data: {
            id: data.id,
            recommendId: data.recommendId
        }
    })
}
export function status(data) {
    return fetch({
        url: baseUrl + utils.getLabelByValue(typePathMap, data.categoryType) + 'status',
        method: 'post',
        data: {
            id: data.id,
            status: data.status
        }
    })
}

export function flag(data) {
    return fetch({
        url: baseUrl + utils.getLabelByValue(typePathMap, data.categoryType) + 'flag',
        method: 'post',
        data: {
            id: data.id,
            flag: data.flag
        }
    })
}

