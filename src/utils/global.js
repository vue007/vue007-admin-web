/**
 * 定义全局变量
 * Author: akai
 * 2017-11-06 19:20:31
 */

const responseCode = {
    SUCCESS: 2000,
    ACCESS_ERROR: 40001,
    AUTH_ERROR: 4003,
    ERROR: 5000
}

const config = {
    defPageNum: 0,
    pageSizeList: [10, 20, 50, 100],
    pageLayout: 'prev, pager, next, sizes',
    selectHelperSize: 200,
    defSelectAllCode: 99,

    ossBasePath: '/boss/'
}

const localStorageKey = {
    ARTICLE_DRAFT: 'ls_article_draft'
}

const flagCode = {
    DISABLED: -1,
    ENABLED: 1
}

const ossAcl = {
    PRIVATE: 0,
    PUBLIC_READ: 1,
    PUBLIC_READ_WRITE: 11
}
const ossAclMap = [
    { value: ossAcl.PRIVATE, label: 'private'},
    { value: ossAcl.PUBLIC_READ, label: 'public-read'},
    { value: ossAcl.PUBLIC_READ_WRITE, label: 'public-read-write'}
]

const userType = {
    SYSTEM: 0,
    REGISTER: 1
};
const userTypeMap = [
    { value: config.defSelectAllCode, label: '所有'},
    { value: userType.SYSTEM, label: '内部用户'},
    { value: userType.REGISTER, label: '普通用户'}
];

const userStatus = {
    DISABLED: 0,
    ENABLED: 1
};

const auditStatus = {
    WAIT_AUDIT: 0,
    PASS: 1,
    NO_PASS: 2
};
const auditStatusMap = [
    { value: config.defSelectAllCode, label: '所有'},
    { value: auditStatus.WAIT_AUDIT, label: '待审核'},
    { value: auditStatus.PASS, label: '通过'},
    { value: auditStatus.NO_PASS, label: '不通过'}
];

const articleStatus = {
    DRAFT: -1,
    RELEASE: 0,
    ON_SHELVE: 1,
    OFF_SHELVE: 2
};
const articleStatusMap = [
    { value: articleStatus.DRAFT, label: '草稿'},
    { value: articleStatus.RELEASE, label: '已发布'},
    { value: articleStatus.ON_SHELVE, label: '已上架'},
    { value: articleStatus.OFF_SHELVE, label: '已下架'}
];
const articleType = {
    IMAGE_TEXT: 1,
    VIDEO: 2,
    WALLPAPER: 3
};

const articleTypeMap = [
    { value: articleType.IMAGE_TEXT, label: '图文'},
    { value: articleType.VIDEO, label: '视频'},
    { value: articleType.WALLPAPER, label: '壁纸'}
];

const auditType = {
    HEAD_IMG: 1,
    NICKNAME: 2
};

const uploadSourceType = {
    DEFAULT: 0,
    HEAD_IMAGE: 1,
    ARTICLE_IMAGE: 2,
    TOPIC_CATEGORY_IMAGE: 3,
    BANNER_IMAGE: 4,
    WALLPAPER: 5
};

const fileMimeType = {
    VIDEO: 'video',
    IMAGE: 'image'
};
const fileMimeTypeMap = [
    { value: fileMimeType.VIDEO, label: '视频'},
    { value: fileMimeType.IMAGE, label: '图片'}
];

const bannerType = { // 1:文章,2:帖子,3:h5页面'
    ARTICLE: 1,
    TOPIC: 2,
    H5: 3
};
const bannerTypeMap = [
    { value: bannerType.ARTICLE, label: '文章'},
    { value: bannerType.TOPIC, label: '帖子'},
    { value: bannerType.H5, label: 'h5页面'}
];

const global = {
    responseCode, config, localStorageKey, ossAcl, ossAclMap,
    flagCode,
    userStatus,
    userType, userTypeMap,
    auditStatus, auditStatusMap,
    articleStatus, articleStatusMap,
    articleType, articleTypeMap,
    auditType,
    uploadSourceType, fileMimeType, fileMimeTypeMap,
    bannerType, bannerTypeMap
};

export default global
