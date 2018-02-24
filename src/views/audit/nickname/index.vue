<template>
    <div class="container">
        <div class="header-container">
            <el-row :gutter="2">
                <!-- 搜索区域 -->
                <el-col :md="16">
                    <el-form :inline="true" :model="state.searchData"  ref="searchForm">
                        <el-form-item label="" prop="auditStatusMap">
                            <el-select class="search-item"  v-model="state.searchData.status" size="mini" style="width: 100px;" placeholder="审核状态">
                                <el-option
                                    v-for="item in state.auditStatusMap"
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
                <el-col :md="8" class="tr">
                </el-col>
            </el-row>
        </div>

        <el-table :data="state.list" v-loading="state.loadingTable">
            <el-table-column prop="userNickname" label="昵称" width="200"></el-table-column>
            <el-table-column prop="nickname" label="新昵称" width="200"></el-table-column>
            <el-table-column prop="createTime" label="修改时间" min-width="120" :formatter="$utils.dateTimeFormat"></el-table-column>

            <el-table-column fixed="right" align="center" label="审核" width="100">
                <template slot-scope="scope">
                    <OperButton v-if="scope.row.status == $global.auditStatus.WAIT_AUDIT" content="通过" type="success" icon="yes"
                                oper="confirm"
                                confirmTitle="确定通过？"
                                confirmText="通过后此昵称将生效！"
                                @click="status({id: scope.row.id, status: $global.auditStatus.PASS})"></OperButton>
                    <OperButton v-if="scope.row.status == $global.auditStatus.WAIT_AUDIT" content="拒绝" type="danger" icon="no"
                                oper="confirm"
                                confirmTitle="确定要拒绝？"
                                confirmText="拒绝后该用户的昵称将恢复默认！"
                                @click="status({id: scope.row.id, status: $global.auditStatus.NO_PASS})"></OperButton>
                    <el-tag size="small" type="danger" v-if="scope.row.status == $global.auditStatus.NO_PASS">已拒绝</el-tag>
                    <el-tag size="small" type="success" v-if="scope.row.status == $global.auditStatus.PASS">已通过</el-tag>
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
</template>

<script>
    import { OperButton } from '@/components'
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('audit/nickname');

    export default {
        components: { OperButton },
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
