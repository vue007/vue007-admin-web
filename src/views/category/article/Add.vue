<template>
    <el-dialog title="新增分类"
               @open="initAddDialog"
               :visible.sync="state.addDialog" custom-class="custom_form_dialog" >
        <el-form :model="form" :rules="formRules" ref="form" label-position="left">
            <el-form-item label="类型" :label-width="formLabelWidth" prop="categoryType">
                <template v-for="item in $global.articleTypeMap">
                    <el-radio v-model="form.categoryType" size="mini" border
                        :key="item.value"
                        :label="item.value">
                        {{item.label}}
                    </el-radio>
                </template>
            </el-form-item>
            <el-form-item label="名称" :label-width="formLabelWidth" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <OperButton customClass="fl" content="重置" type="info" icon="reset" @click="resetDialog"></OperButton>

            <el-button type="text" @click="closeAddDialog" size="medium" class="mr20i">取 消</el-button>
            <el-button type="primary" @click="addArticleCategory" size="medium" :loading="state.loadingDialog" >确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('category/article')

    import { OperButton } from '@/components'

    export default {
        components: {OperButton},
        data() {
            return {
                formLabelWidth: '60px',
                form: {
                    categoryType: this.$global.articleType.IMAGE_TEXT,
                    name: ''
                },
                formRules: {
                    categoryType: [
                        { required: true, message: '请选择分类', trigger: 'change' }
                    ],
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
            initAddDialog () { // 初始化dialog 将分类初始类型同步
                this.form.categoryType = this.state.searchData.categoryType + 0;
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
