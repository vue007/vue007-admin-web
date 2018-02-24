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
                    <OperButton content="排序" type="primary" icon="sort" @click="openSortDialog"></OperButton>
                    <OperButton content="新增" type="primary" icon="add" @click="openAddDialog"></OperButton>
                </el-col>
            </el-row>
        </div>

        <el-table :data="state.list" v-loading="state.loadingTable">
            <el-table-column prop="name" label="名称" min-width="100"></el-table-column>
            <el-table-column prop="topicCount" label="文章总数" min-width="100"></el-table-column>
            <el-table-column prop="latestTopicUpdateTime" label="最新更新时间" min-width="100" :formatter="$utils.dateTimeFormat"></el-table-column>

            <el-table-column fixed="right" align="right" label="操作" width="100">
                <template slot-scope="scope">
                    <OperButton content="编辑" type="primary" icon="edit"
                                @click="openEditDialog(scope.row)"></OperButton>
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
        <Sort></Sort>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('category/topic')

    import Add from './Add'
    import Edit from './Edit'
    import Sort from './Sort'

    import { OperButton } from '@/components'

    export default {
        components: { Add, Edit, Sort, OperButton},
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
