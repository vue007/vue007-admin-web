<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened" ></hamburger>
        <levelbar></levelbar>
        <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>

        <el-dropdown class="avatar-container" size="medium" trigger="click">
            <div class="avatar-wrapper">
                <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link class='inlineBlock' to="/">
                    <el-dropdown-item>
                        首页
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <Screenfull class="screenfull"></Screenfull>
        <UploadTool class="upload-tool"></UploadTool>
    </el-menu>

</template>

<script>
    import {mapGetters} from 'vuex'

    import Levelbar from './Levelbar'
    import TabsView from './/TabsView'
    import Hamburger from 'components/common/Hamburger'
    import Screenfull from 'components/common/Screenfull'
    import ErrorLog from 'components/common/ErrLog'
    import errLogStore from 'store/errLog'

    export default {
        components: {
            Levelbar,
            TabsView,
            Hamburger,
            ErrorLog,
            Screenfull
        },
        data() {
            return {
                log: errLogStore.state.errLog
            }
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'name',
                'avatar'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSideBar')
            },
            logout() {
                this.$store.dispatch('system/login/LogOut').then(() => {
                    location.reload()// 为了重新实例化vue-router对象 避免bug
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 36px;
        line-height: 34px;
        border-radius: 0px !important;
        border-bottom-width:0px;
        background: -webkit-linear-gradient(left top, #5ca7d6, #add3eb); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(bottom right, #5ca7d6, #add3eb); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(bottom right, #5ca7d6, #add3eb); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #5ca7d6, #add3eb);

        /*background: -webkit-linear-gradient(#5ca7d6, #add3eb); !* Safari 5.1 - 6.0 *!*/
        /*background: -o-linear-gradient(#5ca7d6, #add3eb); !* Opera 11.1 - 12.0 *!*/
        /*background: -moz-linear-gradient(#5ca7d6, #add3eb); !* Firefox 3.6 - 15 *!*/
        /*background: linear-gradient(#5ca7d6, #add3eb); !* 标准的语法 *!*/
        /*background-color: #5ca7d6;*/
        .hamburger-container {
            position: relative;
            top: -3px;
            line-height: 43px;
            height: 30px;
            float: left;
            padding: 0 10px;
        }
        .errLog-container {
            display: inline-block;
            position: absolute;
            right: 10px;
        }
        .upload-tool {
            display: inline-block;
            position: absolute;
            right: 130px;
            margin-top: 2px;
        }
        .screenfull {
            position: absolute;
            right: 90px;
            top: 2px;
        }
        .avatar-container {
            height: 50px;
            display: inline-block;
            position: absolute;
            right: 35px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 8px;
                position: relative;
                .user-avatar {
                    width: 42px;
                    height: 42px;
                    border: solid 1px #f2f2f2;
                    border-radius: 42px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
</style>



