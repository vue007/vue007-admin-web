<template>
    <div class="container">
        <div class="header-container">
            <el-row :gutter="2">
                <!-- 搜索区域 -->
                <el-col :md="16">
                    <el-form :inline="true" :model="state.searchData"  ref="searchForm">
                        <el-form-item label="" prop="categoryType">
                            <el-radio-group class="search-item"  v-model="state.searchData.categoryType" size="mini">
                                <el-radio-button class="custom-tab-radio"
                                                 v-for="item in $global.articleTypeMap"
                                                 :key="item.value"
                                                 :label="item.value">
                                    {{item.label}}
                                </el-radio-button>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="" prop="categoryId">
                            <el-select v-model="state.searchData.categoryId" size="mini" placeholder="分类" clearable style="width: 100px;">
                                <ArticleCategorySH :categoryType="state.searchData.categoryType"></ArticleCategorySH>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="" prop="keywords">
                            <el-input size="mini" @keyup.enter.native="getData" style="width: 200px;" v-model="state.searchData.keywords"
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
                    <OperButton content="新增" type="primary" icon="add" @click="linkToAdd"></OperButton>
                </el-col>
            </el-row>
        </div>

        <el-table :data="state.list" v-loading="state.loadingTable" border>
            <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="categoryName" label="分类" min-width="80" show-overflow-tooltip></el-table-column>
            <el-table-column prop="status" label="状态" min-width="70" >
                <template slot-scope="scope">
                    {{ $utils.getStatusFromMap( $global.articleStatusMap, scope.row.status) }}
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" min-width="160" :formatter="$utils.dateTimeFormat"></el-table-column>

            <el-table-column fixed="right" align="center" label="操作" width="190">
                <template slot-scope="scope">
                    <OperButton content="编辑" type="primary" icon="edit"
                                @click="linkToEdit(scope.row)"></OperButton>

                    <OperButton v-if="scope.row.status == $global.articleStatus.DRAFT" content="发布" type="info" icon="release"
                                :disabled="scope.row.flag == $global.flagCode.DISABLED"
                                oper="confirm"
                                confirmTitle="确定将此草稿发布吗？"
                                confirmText="发布后将可以上架！"
                                @click="handleChangeStatus(scope.row, $global.articleStatus.RELEASE)"></OperButton>
                    <OperButton v-if="scope.row.status == $global.articleStatus.RELEASE" content="上新" type="success" icon="on-shelve"
                                :disabled="scope.row.flag == $global.flagCode.DISABLED"
                                oper="confirm"
                                confirmTitle="确定要上架吗？"
                                confirmText="上架后,用户将可以看到！"
                                @click="handleChangeStatus(scope.row, $global.articleStatus.ON_SHELVE)"></OperButton>
                    <OperButton v-if="scope.row.status == $global.articleStatus.ON_SHELVE" content="下架" type="warning" icon="off-shelve"
                                :disabled="scope.row.flag == $global.flagCode.DISABLED"
                                oper="confirm"
                                confirmTitle="确定要下架吗？"
                                confirmText="下架后,用户将看不到此文章！"
                                @click="handleChangeStatus(scope.row, $global.articleStatus.OFF_SHELVE)"></OperButton>
                    <OperButton v-if="scope.row.status == $global.articleStatus.OFF_SHELVE" content="上架" type="success" icon="on-shelve"
                                :disabled="scope.row.flag == $global.flagCode.DISABLED"
                                oper="confirm"
                                confirmTitle="确定要上架吗？"
                                confirmText="上架后,用户将可以看到！"
                                @click="handleChangeStatus(scope.row, $global.articleStatus.ON_SHELVE)"></OperButton>


                    <OperButton v-if="_.isEmpty( scope.row.recommendId )" content="设为推荐" type="success" icon="choiceness-o"
                                :disabled="scope.row.flag == $global.flagCode.DISABLED || scope.row.categoryType == $global.articleType.WALLPAPER"
                                oper="confirm"
                                confirmTitle="确定推荐？"
                                confirmText="推荐后将在首页展示！"
                                @click="recommend(scope.row)"></OperButton>
                    <OperButton v-else content="取消推荐" type="danger" icon="choiceness-o"
                                :disabled="scope.row.flag == $global.flagCode.DISABLED || scope.row.categoryType == $global.articleType.WALLPAPER"
                                oper="confirm"
                                confirmTitle="确定取消推荐？"
                                confirmText="取消后将不在首页展示！"
                                @click="recommend(scope.row)"></OperButton>

                    <OperButton v-if="scope.row.flag == $global.flagCode.ENABLED" content="删除" type="danger" icon="delete"
                                :disabled="scope.row.status == $global.articleStatus.ON_SHELVE"
                                oper="confirm"
                                confirmTitle="确定删除吗？"
                                confirmText="删除后此内容将消失！"
                                @click="flag(scope.row)"></OperButton>
                    <OperButton v-if="scope.row.flag == $global.flagCode.DISABLED" content="还原" type="success" icon="restore"
                                oper="confirm"
                                confirmTitle="确定恢复吗？"
                                confirmText="如误删请立即恢复,可能是你最后的补救机会了！"
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
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('content/article')

    import Edit from './Edit'
    import { OperButton } from '@/components'
    import ArticleCategorySH from '@/views/category/article/helper/SelectHelper'

    export default {
        components: { Edit, OperButton, ArticleCategorySH },
        data() {
            return {}
        },
        created: function() {
            this.getData();
        },
        watch: {
            'state.searchData.pageSize': function() {
                this.getData();
            },
            'state.searchData.categoryType': function() {
                this.state.searchData.categoryId = '';
                this.getData();
            }
        },
        methods: {
            ...mapActions([
                'getData',
                'changePageSize',
                'openSortDialog',
                'recommend',
                'status',
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
            },
            handleChangeStatus(row, status) {
                const oldStatus = row.status + 0;// 保存修改前状态
                row.status = status;
                this.status(row).then( () => {
                }).catch(error => {
                    row.status = oldStatus;
                    Promise.reject(error)
                });
            },
            linkToAdd() {
                this.$router.push({ path: '/content/add_article' });
            },
            linkToEdit(row) {
                this.$router.push(
                    {
                        path: '/content/edit_article',
                        query: {
                            id: row.id,
                            categoryType: row.categoryType
                        }
                    }
                );
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
