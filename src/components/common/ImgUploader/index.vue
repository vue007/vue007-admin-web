<template>
    <div style="display: inline-block" v-loading="uploadLoading" element-loading-text="正在上传">
        <el-upload
            class="avatar-uploader"
            :action="url"
            :data="uploadData"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleImgSuccess"
            :on-error="handleImgError"
            :before-upload="beforeImgUpload">
            <img v-if="img" :src="img" class="img">
            <i v-else class="el-icon-plus img-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
    import {getToken} from '@/utils/auth'
    import $global from '@/utils/global'

    export default {
        name: 'uploadImg',
        props: {
            url: {
                type: String,
                default: ''
            },
            type: {
                type: Number,
                default: 1
            },
            defaultImg: {
                type: String,
                default: ''
            },
            allowFileTypes: {
                type: String,
                default: 'image/jpeg,image/png,image/gif'
            },
            maxUploadSize: {
                type: Number,
                default: 2
            }
        },
        data() {
            return {
                img: this.defaultImg,
                uploadData: this.getUploadData,
                uploadLoading: false,
                headers: {
                    'x-token': getToken()
                }
            }
        },
        watch: {
            defaultImg() {
                this.img = this.defaultImg;
            }
        },
        methods: {
            handleImgSuccess(res) {
                if (res['code'] === $global.responseCode.SUCCESS) {
                    this.img = res['data']['url'];
                    this.$emit('success', this.img);
                } else {
                    this.$message.error(res['message'] || '图片上传失败');
                }
                this.uploadLoading = false;
            },
            handleImgError() {
                this.$message.error('图片上传失败');
                this.uploadLoading = false;
            },
            beforeImgUpload(file) {
                const allowTypes = this.allowFileTypes.split(',');
                const isIMG = allowTypes.indexOf(file.type) > -1;
                const isLt2M = file.size / 1024 / 1024 < this.maxUploadSize;

                if (!isIMG) {
                    this.$message.error('不支持此格式文件!');
                }
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过' + this.maxUploadSize + 'MB!');
                }

                const ret = isIMG && isLt2M;

                if (ret) {
                    this.uploadLoading = true;
                }

                return ret;
            }
        },
        computed: {
            getUploadData(){
                return {'type': this.prop.type}
            }
        }
    }
</script>

<style>
    .img-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .img-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .img-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .img {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
