<!--
    Description: 文件选择器
    Author: Akai
    Date: 2018-01-16 13:38:19
 -->
<template>
    <el-dialog :visible.sync="dialog" top="4vh" width="800px" class="custom-mini-dialog" append-to-body
               @open="initDialog">
        <div slot="title">
            <el-row :gutter="2">
                <!-- 搜索区域 -->
                <el-col :md="23">
                    <el-form :inline="true" :model="state.searchData"  ref="searchForm">
                        <el-form-item label="" prop="createAdmin" style="margin-right: 0px;">
                            <el-select class="search-item" v-model="state.searchData.createAdmin" size="mini" placeholder="上传人"
                                       filterable clearable style="width: 100px;">
                                <AdminSH></AdminSH>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="" prop="userType" style="margin-right: 0px;">
                            <el-select class="search-item"  v-model="mimeType" size="mini" placeholder="文件类型" :disabled="fixedType"
                                       filterable clearable style="width: 100px;" >
                                <el-option
                                    v-for="item in $global.fileMimeTypeMap"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="" prop="keywords" style="margin-right: 0px;">
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
                <el-col :md="1" class="tr">
                    <!--<OperButton content="新增" type="primary" icon="add" @click="linkToUpload"></OperButton>-->
                </el-col>
            </el-row>
        </div>
        <el-container>
            <el-main style="padding: 0px; height: 490px;">
                <el-table ref="finderTable" :data="state.list" v-loading="state.loadingTable"
                          :header-cell-style="{padding: '7px 0px', margin: '0px'}"
                          :cell-style="{padding: '7px 0px', margin: '0px'}" height="450"
                          :highlight-current-row="!multiple"
                          @current-change="handleCurrentChange"
                          select
                          @select="handleSelect"
                          @select-all="handleSelectAll"
                          @selection-change="handleSecletionChange">
                    <el-table-column v-if="multiple"
                        type="selection"
                        width="25">
                    </el-table-column>
                    <el-table-column prop="name" label="" width="50" align="center" >
                        <template slot-scope="scope">
                            <template v-if="scope.row.mimeType.indexOf($global.fileMimeType.IMAGE)>=0">
                                <ImageViewer :src="scope.row.url"  style="line-height: 2px;"
                                             placement="right">
                                    <img :src="scope.row.url" height="20"/>
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
                </el-table>
                <div style="width: 100%;">
                    <template v-if="multiple">
                        <template v-for="item in state.selectionList" >
                            <div class="fr" style="display: inline; max-width: 100px; margin-right: 1px; margin-left: 1px;">
                                <ImageViewer :src="item.url"  style="line-height: 2px;"
                                             type="popover"
                                             placement="top">
                                    <img :src="item.url" height="20" style="display:inline; opacity: 0.5;"/>
                                </ImageViewer>
                            </div>
                        </template>
                    </template>
                    <template v-else-if="state.currentSelect.mimeType">
                        <div class="line-viewer fr inline-block" style="margin:0px; pandding: 0px;">
                            <template v-if="state.currentSelect.mimeType.indexOf($global.fileMimeType.IMAGE)>=0">
                                <ImageViewer :src="state.currentSelect.url"  style="line-height: 2px;"
                                             type="popover"
                                             placement="top">
                                    <img :src="state.currentSelect.url" height="20" style="display:inline; opacity: 0.5; margin: 0px; pandding: 0px; "/>
                                </ImageViewer>
                            </template>
                            <template v-else-if="state.currentSelect.mimeType.indexOf($global.fileMimeType.VIDEO)>=0">
                                <icon name="video" scale="1.5"></icon>
                            </template>
                            <template v-else>
                                <icon name="file" scale="1.5"></icon>
                            </template>
                        </div>
                        <div class="fr mr10">
                            {{state.currentSelect.name}}
                        </div>
                    </template>
                </div>
            </el-main>
        </el-container>
        <div slot="footer" class="dialog-footer">
            <div class="block fl"  style="position: relative; left: 20px;">
                <el-pagination class="custom-pagination" small
                               @size-change="changePageSize" @current-change="getData"
                               :current-page.sync="state.searchData.pageNum" :page-size="state.searchData.pageSize" :total="state.total"
                               :page-sizes="$global.config.pageSizeList" :layout="$global.config.pageLayout+',total'"></el-pagination>
            </div>
            <el-button @click="dialog = false" size="mini">取 消</el-button>
            <el-button type="primary"  size="mini"
                       :disabled="state.selectionList.length === 0 && !state.currentSelect.url "
                       @click="sendSelection">插入所选</el-button>
        </div>
    </el-dialog>

</template>

<script>
    import { createNamespacedHelpers } from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('file/finder');

    import AdminSH from '@/views/system/admin/helper/SelectHelper'
    import { OperButton, ImageViewer } from '@/components'

    export default {
        components: { AdminSH, OperButton, ImageViewer },
        props: {
            mimeType: {
                type: String,
                default: ''
            },
            fixedType: {
                type: Boolean,
                default: true
            },
            multiple: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                dialog: false,
                inserted: false
            }
        },
        created: function() {
            this.getData().then( (response) => {});
        },
        mounted: function() {
        },
        watch: {
            'state.searchData.pageSize': function() {
                this.getData();
            },
            'state.list': function() {
                this.$nextTick( () => {
                    this.initSelection();
                });
            }
        },
        methods: {
            ...mapActions([
                'getData',
                'initFinder',
                'changePageSize',
                'changeSelectionList',
                'changeCurrentSelect',
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
            openDialog(row) {
                this.dialog = true;
            },
            closeDialog(row) {
                this.dialog = false;
            },
            initDialog() {
                if (this.state.searchData.mimeType !== this.mimeType) { // 类型切换
                    this.state.searchData.mimeType = this.mimeType;
                    this.state.searchData.pageNum = 0;
                    this.state.searchData.pageSize = 10;
                    this.state.searchData.keywords = '';
                    this.getData();
                }

                if ( this.inserted ) { // 重置复选
                    this.initFinder();
                    this.inserted = false;
                } else { // 可能需要重新激活已选列表
                    this.initSelection();
                }
            },
            initSelection() {
                let self = this;
                if ( !this.$refs.finderTable || this.checkSelectionInitDone() ) { // 页面被销毁后重新激活 或者 窗口重新打开 时 直到初始化完成才罢休
                    setTimeout( () => { self.initSelection() }, 1000);
                } else {
                    if (this.state.selectionList) {
                        this.state.selectionList.forEach(selectRow => {
                            this.state.list.forEach(row => {
                                if ( _.isEqual(selectRow, row) ) {
                                    this.$refs.finderTable.toggleRowSelection(row);
                                }
                            });
                        });
                    } else {
                        this.$refs.finderTable.clearSelection();
                    }
                }
            },
            checkSelectionInitDone() { // 检查是否完成初始化
//                if ( !this.$refs.finderTable && this.$refs.finderTable.selection ) return true;
                if (!this.dialog) return false;
                // 比对 当前list 中 selection 是都已勾选
                let list = _.assign([], this.state.list);
                let selection = _.assign([], this.$refs.finderTable.selection);
                let selectionList = _.assign([], this.state.selectionList);

                if (!selection) return false;
                // 查找到当先列表中
                let shouldSelected =  _.intersectionBy(list, selectionList, 'id');
                let result = _.differenceBy(shouldSelected, selection, 'id');

                return result.length === 0;
            },
            initSelectionWhenOpen() {
                if (this.dialog && this.$refs.finderTable.selection && this.$refs.finderTable.selection.length > 0) {
                    this.initSelection();
                }
            },
            handleSecletionChange(selection) {
                console.log('selection: ----->', selection);
                //
            },
            handleSelect(selection, row) {
                this.changeSelectionList(selection);
//                console.log('selection: ----->', selection, 'row--->', row);
            },
            handleSelectAll(selection) {
                this.changeSelectionList(selection);
//                console.log('selection: ----->', selection);
            },
            handleCurrentChange(row) {
                if ( !this.multiple ) {
                    console.log('row', row);
                    this.changeCurrentSelect(row);
                }
            },
            sendSelection() {

                if (this.multiple) {
                    this.$emit('receiveSelected', _.assign([], this.state.selectionList) )
                } else {
                    this.$emit('receiveSelected', [_.assign({}, this.state.currentSelect)] )
                }
                this.closeDialog();
                this.inserted = true;
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
    .line-viewer{
        div{
            margin: auto 0px;
            padding: auto 0px;
        }
    }

</style>
