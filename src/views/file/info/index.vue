<!--
    Description: 文件管理
    Author: Akai
    Date: 2018-01-16 13:38:19
 -->
<template>
    <div class="container">
        <div class="header-container">
            <el-row :gutter="2">
                <!-- 搜索区域 -->
                <el-col :md="16">
                    <el-form :inline="true" :model="state.searchData"  ref="searchForm">
                        <el-form-item label="" prop="createAdmin">
                            <el-select class="search-item" v-model="state.searchData.createAdmin" size="mini" placeholder="上传人"
                                       filterable clearable="" style="width: 100px;">
                                <AdminSH></AdminSH>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="" prop="userType">
                            <el-select class="search-item"  v-model="state.searchData.mimeType" size="mini" style="width: 100px;" placeholder="文件类型">
                                <el-option
                                    v-for="item in $global.fileMimeTypeMap"
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
                    <!--<OperButton content="新增" type="primary" icon="add" @click="linkToUpload"></OperButton>-->
                </el-col>
            </el-row>
        </div>

        <el-table :data="state.list" v-loading="state.loadingTable" >
            <el-table-column prop="name" label="" width="50" align="center" >
                <template slot-scope="scope">
                    <template v-if="scope.row.mimeType.indexOf($global.fileMimeType.IMAGE)>=0">
                        <ImageViewer :src="scope.row.url"  style="line-height: 2px;"
                                     placement="right">
                            <img :src="scope.row.url" height="20" />
                        </ImageViewer>
                    </template>
                    <template v-else-if="scope.row.mimeType.indexOf($global.fileMimeType.VIDEO)>=0">
                        <icon name="video" scale="1.5"></icon>
                    </template>
                    <template v-else>
                        <icon name="file" scale="1.5"></icon>
                    </template>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="文件名" min-width="200"  show-overflow-tooltip></el-table-column>
            <el-table-column prop="mimeType" label="MIME类型" with="100"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" min-width="120" :formatter="$utils.dateTimeFormat"></el-table-column>

            <el-table-column fixed="right" align="center" header-align="center" label="操作" width="100">
                <template slot-scope="scope">
                    <OperButton content="编辑" type="primary" icon="edit"
                                @click="openEditDialog(scope.row)"></OperButton>

                    <OperButton v-if="scope.row.flag == $global.flagCode.ENABLED" content="删除" type="danger" icon="delete"
                                :disabled="scope.row.status == $global.articleStatus.ON_SHELVE"
                                oper="confirm"
                                confirmTitle="确定删除吗？"
                                confirmText="删除后将不能添加此文件！"
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

        <Add></Add>
        <Edit></Edit>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('file/info');

    import Add from './Add'
    import Edit from './Edit'
    import AdminSH from '@/views/system/admin/helper/SelectHelper'
    import { OperButton, ImageViewer } from '@/components'

    export default {
        components: { Add, Edit, AdminSH, OperButton, ImageViewer },
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
            },
            linkToUpload() {
                this.$router.push({ path: '/file/upload' });
            }
        },
        computed: {
            ...mapState({
                state: state => state
            })
        }
    }
</script>
