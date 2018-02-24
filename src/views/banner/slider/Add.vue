<template>
    <el-dialog title="新增Banner" :visible.sync="state.addDialog" custom-class="custom_form_dialog">
        <el-form :model="form" :rules="formRules" ref="form">
            <el-form-item label="类型" :label-width="formLabelWidth" prop="sliderType">
                <template>
                    <el-radio-group v-model="form.sliderType">
                        <el-radio :label="1">文章</el-radio>
                        <el-radio :label="2">帖子</el-radio>
                        <el-radio :label="3">H5页</el-radio>
                    </el-radio-group>
                </template>
            </el-form-item>
            <el-form-item v-if="form.sliderType == 3" label="标题" :label-width="formLabelWidth" prop="sliderTitle">
                <el-input v-model="form.sliderTitle" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item :label="form.sliderType == $global.bannerType.H5 ? '链接':'ID'" :label-width="formLabelWidth" prop="sliderUrl">
                <el-input v-model="form.sliderUrl" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="图片" :label-width="formLabelWidth" prop="poster">
                <ImageUpload
                    :imageUrl="form.poster"
                    :sourceType="$global.uploadSourceType.BANNER_IMAGE"
                    @success="uploadSuccess">
                </ImageUpload>
                <div class="el-upload__tip">
                    图片大小不能超过 <span style="font-weight: bold">2M</span>，只支持 <span
                    style="font-weight: bold">jpg、png、gif</span> 格式。
                </div>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="text" @click="closeAddDialog" size="medium" class="mr20i">取 消</el-button>
            <el-button type="primary" @click="addSlider(form)" size="medium" :loading="state.loadingDialog">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('banner/slider')
    import OperButton from '@/components/fragment/OperButton'
    import ImageUpload from '@/views/file/upload/helper/ImageUpload'

    export default {
        components: {OperButton, ImageUpload},
        data() {
            var checkTitle = (rule, value, callback) => {
                if(value === ''){
                    callback(new Error('请输入标题'));
                } else {
                    if (value.length < 1 || value.length > 40) {
                        callback(new Error('长度在 1 到 40 个字符'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                formLabelWidth: '60px',
                form: {
                    sliderTitle: '',
                    sliderType: 1,
                    sliderUrl: '',
                    poster: ''
                },
                formRules: {
                    sliderTitle: [
                        { validator: checkTitle, trigger: 'blur'},
                    ],
                    sliderUrl: [
                        { required: true, message: '请输入ID或链接', trigger: 'blur' },
                        { min: 1, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ...mapActions([
                'add',
                'closeAddDialog'
            ]),
            addSlider() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.add(this.form).then( data => {
                            this.state.loadingDialog = false;
                        }).catch(error => {
                            this.state.loadingDialog = false;
                            Promise.reject(error)
                        });
                    } else {
                        this.$message.error('请补全相关信息!');
                        return false;
                    }
                });
            },
            uploadSuccess(poster) {
                this.form.poster = poster;
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
