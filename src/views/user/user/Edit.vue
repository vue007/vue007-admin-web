<template>
    <el-dialog title="修改用户" :visible.sync="state.editDialog" custom-class="custom_form_dialog">
        <el-form :model="form" :rules="formRules" ref="form" label-position="left">
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
                <el-input v-model="form.nickname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="头像" :label-width="formLabelWidth" prop="file">
                <ImageUpload
                    :imageUrl="form.headImg"
                    :sourceType="$global.uploadSourceType.HEAD_IMAGE"
                    @success="uploadSuccess">
                </ImageUpload>
                <div class="el-upload__tip">
                    头像大小不能超过 <span style="font-weight: bold">2M</span>，只支持 <span
                    style="font-weight: bold">jpg、png、gif</span> 格式。
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <OperButton customClass="fl" content="重置" type="info" icon="reset" @click="resetDialog()"></OperButton>

            <el-button type="text" @click="closeEditDialog" size="medium" class="mr20i">取 消</el-button>
            <el-button type="primary" @click="submit" size="medium" :loading="state.loadingDialog">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const {mapState, mapActions} = createNamespacedHelpers('user/user');

    import { OperButton } from '@/components'
    import ImageUpload from '@/views/file/upload/helper/ImageUpload'

    export default {
        components: {OperButton, ImageUpload},
        data() {
            return {
                imgUrl: '',
                formLabelWidth: '60px',
                form: {
                    nickname: '',
                    headImg: ''
                },
                formRules: {
                    nickname: [
                        {required: true, message: '请输入昵称', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        watch: {
            'state.operRow': function () {
                this.initEditForm();
            }
        },
        methods: {
            ...mapActions([
                'edit',
                'closeEditDialog'
            ]),
            submit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.edit(this.form).then(() => {
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
            },
            initEditForm() {
                this.imgUrl = this.state.operRow.headImg;
                this.form = Object.assign({}, this.state.operRow);
            }
        },
        computed: {
            ...mapState({
                state: state => state
            })
        }
    }
</script>
