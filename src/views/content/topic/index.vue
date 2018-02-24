<template>
    <div class="container">
        <div class="header-container">
            <el-row :gutter="2">
                <!-- 搜索区域 -->
                <el-col :md="16">
                    <el-form :inline="true" :model="state.searchData"  ref="searchForm">
                        <el-form-item label="" prop="categoryId">
                            <el-select v-model="state.searchData.categoryId" size="mini" placeholder="话题" clearable style="width: 100px;">
                                <TopicCategorySH></TopicCategorySH>
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
                    <OperButton content="新增" type="primary" icon="add" @click="openAddDialog"  :disabled="true"></OperButton>
                </el-col>
            </el-row>
        </div>

        <el-table :data="state.list" v-loading="state.loadingTable" border>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline>
                        <el-form-item label="ID:">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
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

            <el-table-column fixed="right" align="right" label="操作" width="140">
                <template slot-scope="scope">
                    <OperButton content="编辑" type="primary" icon="edit" :disabled="true"
                                @click="openEditDialog(scope.row)"></OperButton>

                    <OperButton v-if="_.isEmpty( scope.row.recommendId )" content="设为精选" type="success" icon="choiceness-o"
                                :disabled="scope.row.flag == $global.flagCode.DISABLED"
                                oper="confirm"
                                confirmTitle="确定设为精选？"
                                confirmText="推荐后将在首页展示！"
                                @click="recommend(scope.row)"></OperButton>
                    <OperButton v-else content="取消精选" type="danger" icon="choiceness-o"
                                :disabled="scope.row.flag == $global.flagCode.DISABLED"
                                oper="confirm"
                                confirmTitle="确定取消精选？"
                                confirmText="取消后将不在首页展示！"
                                @click="recommend(scope.row)"></OperButton>

                    <OperButton v-if="scope.row.flag == $global.flagCode.ENABLED" content="删除" type="danger" icon="delete"
                                oper="confirm"
                                confirmTitle="确定删除此分类吗？"
                                confirmText="删除后此分类将消失！"
                                @click="flag(scope.row)"></OperButton>
                    <OperButton v-if="scope.row.flag == $global.flagCode.DISABLED" content="还原" type="success" icon="restore"
                                oper="confirm"
                                confirmTitle="确定恢复此分类吗？"
                                confirmText="如果误删请立即恢复,可能是你最后的补救机会了！"
                                @click="flag(scope.row)"></OperButton>
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
    const { mapState, mapActions } = createNamespacedHelpers('content/topic')

    import Add from './Add'
    import Edit from './Edit'
    import { OperButton } from '@/components'
    import TopicCategorySH from '@/views/category/topic/helper/SelectHelper'

    export default {
        components: { Add, Edit, OperButton, TopicCategorySH },
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
                'openSortDialog',
                'recommend',
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
