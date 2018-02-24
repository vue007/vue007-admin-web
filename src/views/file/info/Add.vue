<!--
    Description: 文件新增
    Author: Akai
    Date: 2018-01-16 13:38:19
 -->
<template>
    <el-dialog title="新增用户" :visible.sync="state.addDialog" custom-class="custom_form_dialog">
        <el-form :model="form" :rules="formRules" ref="form" label-position="left">
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
                <el-input v-model="form.nickname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像" :label-width="formLabelWidth" prop="file">
                <ImgUploader
                    :url="uploadUrl"
                    @success="uploadSuccess">
                </ImgUploader>
                <div class="el-upload__tip">
                    头像大小不能超过 <span style="font-weight: bold">2M</span>，只支持 <span
                    style="font-weight: bold">jpg、png、gif</span> 格式。
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <OperButton customClass="fl" content="重置" type="info" icon="reset" @click="resetDialog()"></OperButton>

            <el-button type="text" @click="closeAddDialog" size="medium" class="mr20i">取 消</el-button>
            <el-button type="primary" @click="submit" size="medium" :loading="state.loadingDialog">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
    import {createNamespacedHelpers} from 'vuex'
    const {mapState, mapActions} = createNamespacedHelpers('user/user');

    import { OperButton } from '@/components'
    import ImgUploader from '@/components/common/ImgUploader/index'

    export default {
        components: {OperButton, ImgUploader},
        data() {
            return {
                uploadUrl: process.env.BASE_API + '/api/upload/fileupload?type=' + this.$global.uploadSourceType.HEAD_IMAGE,
                formLabelWidth: '60px',
                form: {
                    nickname: '',
                    headImg: '',
                    type: this.$global.uploadSourceType.HEAD_IMAGE
                },
                formRules: {
                    nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            ...mapActions([
                'add',
                'closeAddDialog'
            ]),
            submit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.add(this.form).then(() => {
                            this.resetDialog();
                        });
                    }
                });
            },
            resetDialog() {
                this.$refs['form'].resetFields();
            },
            uploadSuccess(headImg) {
                this.form.headImg = headImg;
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
