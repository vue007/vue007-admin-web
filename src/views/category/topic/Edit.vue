<template>
    <el-dialog title="编辑帖子分类" :visible.sync="state.editDialog" custom-class="custom_form_dialog">
        <el-form :model="form" :rules="formRules" ref="form">
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="封面图" :label-width="formLabelWidth" prop="imgUrl">
                <ImageUpload
                    :imageUrl="form.imgUrl"
                    :sourceType="$global.uploadSourceType.TOPIC_CATEGORY_IMAGE"
                    @success="uploadSuccess">
                </ImageUpload>
                <div class="el-upload__tip">
                    封面图大小不能超过 <span style="font-weight: bold">2M</span>，只支持 <span
                    style="font-weight: bold">jpg、png、gif</span> 格式。
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <OperButton customClass="fl" content="复原" type="info" icon="recover" @click="initEditForm"></OperButton>

            <el-button type="text" @click="closeEditDialog" size="medium" class="mr20i">取 消</el-button>
            <el-button type="primary" @click="editArticle(form)" size="medium" :loading="state.loadingDialog">确 定</el-button>
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
                uploadUrl: process.env.BASE_API + '/api/upload/fileupload?type=' + this.$global.uploadSourceType.TOPIC_CATEGORY_IMAGE,
                formLabelWidth: '60px',
                form: {
                    name: '',
                    imgUrl: ''
                },
                formRules: {
                    name: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        watch: {
            'state.operRow': function() {
                this.initEditForm();
            }
        },
        methods: {
            ...mapActions([
                'edit',
                'closeEditDialog'
            ]),
            uploadSuccess(url) {
                this.form.imgUrl = url;
            },
            editArticle() {
                this.state.loadingDialog = true;
                this.edit(this.form).then( () => {
                    this.state.loadingDialog = false;
                }).catch(error => {
                    this.state.loadingDialog = false;
                    Promise.reject(error)
                });
            },
            initEditForm() {
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

<style scoped>

</style>
