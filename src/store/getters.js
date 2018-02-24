const getters = {
    sidebar: state => state.app.sidebar,
    visitedViews: state => state.app.visitedViews,
    isFromTab: state => state.app.isFromTab,
    token: state => state.system.login.token,
    avatar: state => state.system.login.avatar,
    nickname: state => state.system.login.nickname,
    username: state => state.system.login.username,
    status: state => state.system.login.status,
    roles: state => state.system.login.roles,
    setting: state => state.system.login.setting,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters
}
export default getters
