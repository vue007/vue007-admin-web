<template>
    <div class="container">
        <div class="header-container">
            <el-row :gutter="2">
                <el-col :md="16" >
                    <el-form :inline="true" :model="state.searchData"  ref="searchForm" style="margin: 5px;" >
                        <el-radio-group v-model="state.status" size="large" type="info" >
                            <el-radio-button label="uploading" class="custom-button-padding">
                                <icon name="uploading" scale="1.5" ></icon>
                            </el-radio-button>
                            <el-radio-button label="uploaded" class="custom-button-padding">
                                <icon name="uploaded" scale="1.5" ></icon>
                            </el-radio-button>
                        </el-radio-group>
                    </el-form>
                </el-col>
                <el-col :md="8" class="tr">
                    <file-upload
                        class="btn btn-primary"
                        post-action="/upload/post"
                        extensions="gif,jpg,jpeg,png,webp,mp4"
                        accept="image/png,image/gif,image/jpeg,image/webp,video/mp4"
                        input-id="file2"
                        :multiple="true"
                        :size="1024 * 1024 * 10"
                        @input-filter="inputFilter"
                        ref="upload">
                        <div class="custom-oper-button el-button el-button--warning el-button--mini is-plain" style="border-radius: 100%;" >
                            <icon name="upload" scale="2" ></icon>
                        </div>
                    </file-upload>
                </el-col>
            </el-row>
        </div>

        <template v-if="state.status == 'uploading'">
            <el-table :data="state.uploadList" v-loading="state.loadingTable"
                      key="uploading"
                      empty-text="点击右上角的 + 号，选择需要上传的文件">
                <el-table-column prop="file.name" label="文件名" min-width="300"></el-table-column>
                <el-table-column prop="" label="文件大小" align="right" with="100">
                    <template slot-scope="scope">
                        {{scope.row.file.size | formatSize}}
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="进度" align="center" width="200" >
                    <template slot-scope="scope">
                        <el-progress :percentage="scope.row.progress" :status="scope.row.status" :text-inside="true" :stroke-width="13"></el-progress>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" align="center" header-align="center" label="操作" width="100">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template v-else-if="state.status == 'uploaded'">
            <el-table :data="state.uploadedList" v-loading="state.loadingTable" :default-sort="{prop: 'saveUpload.createTime', order: 'descending'}"
                      key="upload"
                      empty-text="最近没有上传过的文件">
                <el-table-column prop="saveUpload.name" label="文件名" min-width="300"></el-table-column>
                <el-table-column prop="" label="文件大小" align="right" with="100">
                    <template slot-scope="scope">
                        {{scope.row.file.size | formatSize}}
                    </template>
                </el-table-column>
                <el-table-column prop="saveUpload.createTime" label="上传时间" align="center" width="200" :formatter="$utils.dateTimeFormat">
                </el-table-column>
                <el-table-column fixed="right" align="center" header-align="center" label="操作" width="100">
                    <template slot-scope="scope">
                    </template>
                </el-table-column>
            </el-table>
        </template>

    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('file/upload');

    import FileUpload from 'vue-upload-component'
    import { OperButton } from '@/components'
    export default {
        components: {
            FileUpload, OperButton
        },
        data() {
            return {
                status: 1
            }
        },
        computed: {
            ...mapState({
                state: state => state
            })
        },
        methods: {
            ...mapActions([
                'addFile'
            ]),
            inputFilter(newFile, oldFile, prevent) {
                console.log('newFile', newFile)
                if (newFile && !oldFile) {
                    // Add file
                    // Filter non-image file
                    // Will not be added to files
                    if (!/\.(jpeg|jpe|jpg|gif|png|webp|mp4)$/i.test(newFile.name)) {
                        return prevent()
                    }
                    newFile.file['acl'] = this.$utils.getLabelByValue(this.$global.ossAclMap, this.$global.ossAcl.PUBLIC_READ);
                    newFile.file['queueUpload'] = true;
                    this.addFile( _.assign(newFile.file) );
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
