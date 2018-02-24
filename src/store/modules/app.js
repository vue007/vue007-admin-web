import Cookies from 'js-cookie'

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus')
        },
        visitedViews: [],
        isFromTabFlag: false
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
        },
        ADD_VISITED_VIEWS: (state, view) => {
            let flag = false;
            _(state.visitedViews).forEach(function(item) {
                if ( item.path === view.path ) {
                    if (!state.isFromTabFlag) {
                        item.sort = new Date().getTime();
                    }
                    flag = true;
                }
            })
            if (flag) return;
            state.visitedViews.push({
                name: view.name,
                path: view.path,
                query: view.query,
                params: view.params,
                sort: new Date().getTime()
            })
        },
        DEL_VISITED_VIEWS: (state, view) => {
            let index
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.path === view.path) {
                    index = i
                    break
                }
            }
            state.visitedViews.splice(index, 1)
            // var a = _.remove(_.clone(state.visitedViews), function(item) {
            //     return item.path === view.path
            // })
        },
        SET_IS_FROM_TAB: (state, flag) => {
            state.isFromTabFlag = flag;
        }
    },
    actions: {
        ToggleSideBar({commit}) {
            commit('TOGGLE_SIDEBAR')
        },
        addVisitedViews({commit}, view) {
            commit('ADD_VISITED_VIEWS', view)
        },
        delVisitedViews({commit, state}, view) {
            return new Promise((resolve) => {
                commit('DEL_VISITED_VIEWS', view)
                resolve([...state.visitedViews])
            })
        },
        setIsFromTabFlag({commit}, flag) {
            commit('SET_IS_FROM_TAB', flag)
        }
    }
}

export default app
