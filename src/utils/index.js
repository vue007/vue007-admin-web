/**
 * 全局工具类
 * Author: akai
 * 2017-11-06 19:21:56
 */

import global from './global'
import moment from 'moment'

const clearObj = function(obj) {
    for (var key in obj) {
        obj[key] = '';
    }
    return obj;
}

const dateFormat = function(row, column) {
    var date = row[column.property];
    if ( date === null || date === undefined) {
        return '';
    }
    return moment(date).format('YYYY-MM-DD');
}
const dateTimeFormat = function(row, column) {
    let date = {};
    let deep = column.property.split('.')
    if ( deep.length <= 1 ) {
        date = row[column.property];
    } else {
        date = row[deep[0]]
        for (let i = 1; i < deep.length; i++) {
            date = date[deep[i]]
        }
    }
    if ( date === null || date === undefined ) {
        return '';
    }
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}

const toggleFlag = function(flag) {
    if (flag === global.flagCode.DISABLED) {
        return global.flagCode.ENABLED;
    } else if (flag === global.flagCode.ENABLED) {
        return global.flagCode.DISABLED;
    }
}

const toggleStatus = function(status, upFlag) {
    if (upFlag) {
        return status++;
    } else {
        return status--;
    }
}

const makeListSort = function(list) {
    var _obj = [];
    var temp = {};
    var i = 1;
    _.forEach(list, function(obj) {
        temp = {
            id: obj.id + '',
            sort: i
        };
        _obj.push(temp);
        i = i + 1;
    });
    return _obj;
}

const formatStrLength = function(str, length) {
    if ( str.length < length ) {
        return str;
    } else {
        return str.substring(0, length) + '……';
    }
}

/**
 * 根据 code 获取状态字符串
 */
const getStatusFromMap = function(map, code) {
    if ( !_.isNumber(code) ) return '';
    const obj = _.find( map, {'value': code});
    if ( !obj ) return '';
    return obj.label;
}

const getLabelByValue = function(map, code) {
    if ( !_.isNumber(code) ) return '';
    const obj = _.find( map, {'value': code});
    if ( !obj ) return '';
    return obj.label;
}

const getValueByLabel = function(map, val) {
    if ( !_.isString(val) ) return '';
    const obj = _.find( map, {'label': val});
    if ( !obj ) return '';
    return obj.value;
}

const index = {
    clearObj, toggleFlag, toggleStatus, makeListSort, formatStrLength,
    dateFormat, dateTimeFormat, getStatusFromMap, getLabelByValue, getValueByLabel
}

export default index
