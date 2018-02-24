<template>
    <div v-loading="uploading" class="inline-block">
        <div @click.stop="handleOpenFinder" class="inline-block">
            <template v-if="imageUrl === ''">
                <div class="box-back">
                    <icon name="image" scale="8" :style="customBoxStyle"></icon>
                </div>
            </template>
            <template v-else>
                <img :src="imageUrl" :style="customImageStyle" />
            </template>
        </div>

        <Finder ref="finderOnImageUpload"
                finderId="123"
                :multiple="false"
                :mimeType="$global.fileMimeType.IMAGE"
                @receiveSelected.self="insertImages"></Finder>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('file/upload');

    import FileUpload from 'vue-upload-component'
    import Finder from '@/views/file/helper/Finder'
    import { OperButton } from '@/components'
    import global from '@/utils/global'
    export default {
        components: {
            FileUpload, OperButton, Finder
        },
        props: {
            type: { // 优先类型
                type: String,
                default: 'upload'
            },
            sourceType: {
                type: Number,
                default: global.uploadSourceType.DEFAULT
            },
            imageUrl: {
                type: String,
                default: ''
            },
            accept: {
                type: String,
                default: 'image/png,image/gif,image/jpeg,image/webp'
            },
            extensions: {
                type: String,
                default: 'gif,jpg,jpeg,png,webp'
            },
            maxSize: {
                type: Number,
                default: 2
            },
            customBoxStyle: {
                type: Object,
                default: () => {
                    return {
                        height: 'inherit',
                        width: '100%'
                    }
                }
            },
            customImageStyle: {
                type: Object,
                default: () => {
                    return {
                        height: 'inherit',
                        'width': '100%'
                    }
                }
            }
        },
        data() {
            return {
                uploading: false
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
            handleOpenFinder() {
                this.$refs.finderOnImageUpload.openDialog();
            },
            insertImages(selected) {
//                this.$emit('success', selected[0].url);
                this.imageUrl = selected[0].url;
            },
            inputFilter(newFile, oldFile, prevent) {
                console.log('newFile', newFile)
                if (newFile && !oldFile) {
                    // Add file
                    // Filter non-image file
                    // Will not be added to files
                    let file = newFile.file;
                    // 校验 格式
                    if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
                        this.$message({
                            message: '请选择正确的图片格式~',
                            type: 'warning'
                        });
                        return prevent();
                    }
                    // 校验 大小
                    let maxSize = this.maxSize * 1024 * 1024;
                    if ( file.size > maxSize ) {
                        this.$message({
                            message: '文件不能超过 ' + this.maxSize + 'M',
                            type: 'warning'
                        });
                        return prevent();
                    }

                    file['acl'] = this.$utils.getLabelByValue(this.$global.ossAclMap, this.$global.ossAcl.PUBLIC_READ);
                    file['queueUpload'] = false; // 单个上传
                    file['successCallback'] = this.uploadSuccess;
                    file['sourceType'] = this.sourceType;
                    this.addFile( file );
                    this.uploading = true;
                }
            },
            uploadSuccess(upload) {
                this.uploading = false;
                this.$emit('success', upload.saveUpload.url);
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .box-back{
        svg {
            border: 1px dashed #ececec;
            box-sizing: border-box;
            color: #ececec;
        }
    }
    .box-back :hover {
        border: 1px dashed #aed3ea;
        box-sizing: border-box;
        color: #aed3ea;
    }
</style>
