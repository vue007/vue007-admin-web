<template>
    <el-dialog title="新增资讯分类" :visible.sync="state.addDialog" custom-class="custom_form_dialog" >
        <el-form :model="form" :rules="formRules" ref="form" label-position="left">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="封面图" :label-width="formLabelWidth" prop="imgUrl">
                <ImageUpload
                    :imageUrl="form.imgUrl"
                    :sourceType="$global.uploadSourceType.ARTICLE_IMAGE"
                    @success="uploadSuccess">
                </ImageUpload>
                <div class="el-upload__tip">
                    封面图大小不能超过 <span style="font-weight: bold">2M</span>，只支持 <span
                    style="font-weight: bold">jpg、png、gif</span> 格式。
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <OperButton customClass="fl" content="重置" type="info" icon="reset" @click="resetDialog()"></OperButton>

            <el-button type="text" @click="closeAddDialog" size="medium" class="mr20i">取 消</el-button>
            <el-button type="primary" @click="addArticleCategory" size="medium" :loading="state.loadingDialog" >确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('category/topic')

    import { OperButton } from '@/components'
    import ImageUpload from '@/views/file/upload/helper/ImageUpload'

    export default {
        components: {OperButton, ImageUpload},
        data() {
            return {
                formLabelWidth: '60px',
                form: {
                    name: '',
                    imgUrl: ''
                },
                formRules: {
                    name: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ...mapActions([
                'add',
                'closeAddDialog'
            ]),
            uploadSuccess(url) {
                this.form.imgUrl = url;
            },
            addArticleCategory() {
                this.state.loadingDialog = true;
                this.add(this.form).then( () => {
                    this.state.loadingDialog = false;
                    this.resetDialog();
                }).catch(error => {
                    this.state.loadingDialog = false;
                    Promise.reject(error)
                });
            },
            resetDialog() {
                this.$refs['form'].resetFields();
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
