<template>
    <el-dialog title="修改文件信息" :visible.sync="state.editDialog" custom-class="custom_form_dialog">
        <el-form :model="form" :rules="formRules" ref="form" label-position="left">
            <el-form-item label="文件名" label-width="70px" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
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
    const {mapState, mapActions} = createNamespacedHelpers('file/info');

    import { OperButton } from '@/components'

    export default {
        components: {OperButton},
        data() {
            return {
                form: {
                    id: '',
                    name: ''
                },
                formRules: {
                    name: [
                        {required: true, message: '文件名不能为空', trigger: 'blur'},
                        {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
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
            initEditForm() {
                this.form.id = this.state.operRow.id;
                this.form.name = this.state.operRow.name;
            }
        },
        computed: {
            ...mapState({
                state: state => state
            })
        }
    }
</script>
