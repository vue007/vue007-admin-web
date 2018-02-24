<template>
    <div class="container">
        <div class="header-container">
            <el-row :gutter="2">
                <!-- 搜索区域 -->
                <el-col :md="16">
                    <el-form :inline="true" :model="state.searchData"  ref="searchForm">
                        <el-form-item label="" prop="keywords">
                            <el-input class="search-item" size="mini" @keyup.enter.native="getData" style="width: 200px;" v-model="state.searchData.keywords"
                                      placeholder="关键字检索"></el-input>
                        </el-form-item>
                        <el-form-item label="" >
                            <el-button class="search-item custom-search-button" size="mini" type="primary" plain icon="search" @click="handleSearch" :loading="state.loadingSearch">
                                <icon v-if="!state.loadingSearch" name="search" scale="1.1" style="position: static;"></icon>
                                搜索
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :md="8" class="tr">
                    <OperButton content="新增" type="primary" icon="add" @click="openAddDialog"></OperButton>
                </el-col>
            </el-row>
        </div>

        <el-table :data="state.list" v-loading="state.loadingTable">
            <el-table-column prop="nickname" label="昵称" min-width="100"></el-table-column>
            <el-table-column prop="username" label="帐号" min-width="100"></el-table-column>
            <el-table-column prop="lastLoginTime" label="最后登录时间" min-width="100" :formatter="$utils.dateTimeFormat"></el-table-column>

            <el-table-column fixed="right" align="right" label="操作" width="100">
                <template slot-scope="scope">
                    <OperButton content="编辑" type="primary" icon="edit"
                                @click="openEditDialog(scope.row)"></OperButton>
                    <OperButton v-if="scope.row.flag == $global.flagCode.ENABLED" content="禁用" type="danger" icon="ban"
                                oper="confirm"
                                confirmTitle="确定禁用此管理员吗？"
                                confirmText="禁用后此管理员将无法登录！"
                                @click="flag({id: scope.row.id, flag: $global.flagCode.DISABLED})"></OperButton>
                    <OperButton v-if="scope.row.flag == $global.flagCode.DISABLED" content="恢复" type="success" icon="recover"
                                oper="confirm"
                                confirmTitle="确定恢复此管理员吗？"
                                confirmText="恢复后此管理员将重获新生！"
                                @click="flag({id: scope.row.id, flag: $global.flagCode.ENABLED})"></OperButton>
                </template>
            </el-table-column>
        </el-table>

        <div class="block mt30 fr"  style="position: relative; left: 20px;">
            <el-pagination class="custom-pagination" background small
                           @size-change="changePageSize" @current-change="getData"
                           :current-page.sync="state.searchData.pageNum" :page-size="state.searchData.pageSize" :total="state.total"
                           :page-sizes="$global.config.pageSizeList" :layout="$global.config.pageLayout"></el-pagination>
        </div>

        <!-- 新增修改组件 -->
        <Add></Add>
        <Edit></Edit>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('system/admin')

    import Add from './Add'
    import Edit from './Edit'
    import { OperButton } from '@/components'

    export default {
        components: { Add, Edit, OperButton },
        data() {
            return {}
        },
        created: function() {
            this.getData();
        },
        watch: {
            'state.searchData.pageSize': function() {
                this.getData();
            }
        },
        methods: {
            ...mapActions([
                'getData',
                'changePageSize',
                'openAddDialog',
                'openEditDialog',
                'flag'
            ]),
            handleSearch() {
                this.state.loadingSearch = true;
                this.getData().then( () => {
                    this.state.loadingSearch = false;
                }).catch(error => {
                    this.state.loadingSearch = false;
                    Promise.reject(error)
                });
            }
        },
        computed: {
            ...mapState({
                state: state => state
            })
        }
    }
</script>

<style scoped>

</style>
