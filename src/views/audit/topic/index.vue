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
                                    v-for="item in $global.auditStatusMap"
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

        <el-table :data="state.list" v-loading="state.loadingTable" :stripe="true" border>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="page-table-expand">
                        <el-form-item label="标题:">
                            <span>{{ scope.row.title }}</span>
                        </el-form-item>
                        <el-form-item label="内容:">
                            <span>{{ scope.row.content }}</span>
                        </el-form-item>
                        <el-form-item label="图片:" v-if="!_.isEmpty(scope.row.imgUrl)">
                            <img style="width: 480px;" :src="scope.row.imgUrl" />
                        </el-form-item>
                        <el-form-item label="图片" v-else> 无 </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="title" label="帖子标题" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="categoryName" label="帖子话题" min-width="100"></el-table-column>
            <el-table-column prop="status" label="审核状态" min-width="80" >
                <template slot-scope="scope">
                    {{ $utils.getStatusFromMap( $global.auditStatusMap, scope.row.status) }}
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" min-width="100" :formatter="$utils.dateTimeFormat"></el-table-column>

            <el-table-column fixed="right" align="center" label="操作" width="100">
                <template slot-scope="scope">
                    <OperButton v-if="scope.row.status == $global.auditStatus.WAIT_AUDIT" content="通过" type="success" icon="yes"
                                oper="confirm"
                                confirmTitle="确定通过？"
                                confirmText="通过后将展示！"
                                @click="status({id: scope.row.id, status: $global.auditStatus.PASS})"></OperButton>
                    <OperButton v-if="scope.row.status == $global.auditStatus.WAIT_AUDIT" content="拒绝" type="danger" icon="no"
                                oper="confirm"
                                confirmTitle="确定要拒绝？"
                                confirmText="拒绝后将不予展示！"
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
    const { mapState, mapActions } = createNamespacedHelpers('audit/topic')

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

<style scoped>
    .page-table-expand {
        font-size: 0;
    }
    .page-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .page-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 100%;
    }
</style>
