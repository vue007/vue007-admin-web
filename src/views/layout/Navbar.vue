<template>
    <el-menu class="navbar" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened" ></hamburger>
        <levelbar></levelbar>
        <error-log v-if="log.length>0" class="errLog-container" :logsList="log"></error-log>

        <el-dropdown class="avatar-container" size="small" trigger="click">
            <div class="avatar-wrapper">
                <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
                <router-link class='inlineBlock' to="/">
                    <el-dropdown-item>
                        首页
                    </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided><span @click="logout" style="display:block;">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <Screenfull class="screenfull"></Screenfull>
        <UploadTool class="upload-tool"></UploadTool>
        <!--<el-popover-->
            <!--placement="bottom-start"-->
            <!--:width="200"-->
            <!--trigger="hover">-->
            <!--<el-progress :percentage="70"></el-progress>-->
            <!--<el-progress :percentage="70"></el-progress>-->
            <!--<el-progress :percentage="70"></el-progress>-->
            <!--<el-progress :percentage="70"></el-progress>-->
            <!--<el-progress :percentage="70"></el-progress>-->
            <!--<el-progress-->
                <!--slot="reference"-->
                <!--class="upload-tool" type="circle" :percentage="25" :stroke-width="2" :width="28"></el-progress>-->
        <!--</el-popover>-->
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

    import UploadTool from 'views/file/upload/helper/NavTool'

    export default {
        components: {
            Levelbar,
            TabsView,
            Hamburger,
            ErrorLog,
            Screenfull,
            UploadTool
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
        height: 34px;
        line-height: 34px;
        border-radius: 0px !important;
        border-bottom-width:0px;
        .hamburger-container {
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
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 42px;
                    height: 42px;
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



