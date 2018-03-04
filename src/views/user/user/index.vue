<template>
    <div class="panel-box">
        <div class="panel-header">
            <el-row :gutter="2">
                <!-- 搜索区域 -->
                <el-col :md="16">
                    <el-form :inline="true" :model="state.searchData"  ref="searchForm">
                        <el-form-item label="" prop="userType">
                            <el-select class="search-item"  v-model="state.searchData.userType" size="mini" style="width: 100px;" placeholder="用户类型">
                                <el-option
                                    v-for="item in $global.userTypeMap"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
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
                <el-col :md="8" class="tr mt5">
                    <OperButton content="新增" type="primary" icon="add" @click="openAddDialog"></OperButton>
                </el-col>
            </el-row>
        </div>

        <div class="panel-content">
            <el-table :data="state.list" v-loading="state.loadingTable">
                <el-table-column prop="nickname" label="昵称" width="200"></el-table-column>
                <el-table-column prop="headImg" label="头像" width="150">
                    <template slot-scope="scope">
                        <img style="width: 20px;height: 20px;border-radius: 50%" v-bind:src="scope.row.headImg" v-bind:alt="scope.row.nickname">
                    </template>
                </el-table-column>
                <el-table-column prop="userType" label="用户类型" with="150">
                    <template slot-scope="scope">
                        <el-tag size="small" v-if="scope.row.userType == $global.userType.SYSTEM">内部用户</el-tag>
                        <el-tag size="small" type="success" v-if="scope.row.userType == $global.userType.REGISTER">注册用户</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" min-width="120" :formatter="$utils.dateTimeFormat"></el-table-column>

                <el-table-column fixed="right" align="center" header-align="center" label="操作" width="100">
                    <template slot-scope="scope">
                        <OperButton content="编辑" type="primary" icon="edit"
                                    @click="openEditDialog(scope.row)"></OperButton>
                        <OperButton v-if="scope.row.status == $global.userStatus.ENABLED" content="拉黑" type="danger" icon="ban"
                                    oper="confirm"
                                    confirmTitle="确定拉黑此用户吗？"
                                    confirmText="拉黑后此用户将无法登录!"
                                    @click="status({id: scope.row.id, status: $global.userStatus.DISABLED})"></OperButton>
                        <OperButton v-else content="恢复" type="success" icon="recover"
                                    oper="confirm"
                                    confirmTitle="确定恢复此用户吗？"
                                    confirmText="恢复后此用户可能继续调皮!"
                                    @click="status({id: scope.row.id, status: $global.userStatus.ENABLED})"></OperButton>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block mt30 fr"  style="position: relative; left: 20px;">
                <el-pagination class="custom-pagination" background small
                               @size-change="changePageSize" @current-change="getData"
                               :current-page.sync="state.searchData.pageNum" :page-size="state.searchData.pageSize" :total="state.total"
                               :page-sizes="$global.config.pageSizeList" :layout="$global.config.pageLayout"></el-pagination>
            </div>
        </div>

        <Add></Add>
        <Edit></Edit>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('user/user');

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
                'status'
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
