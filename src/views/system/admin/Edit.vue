<template>
    <el-dialog title="编辑管理员" :visible.sync="state.editDialog" custom-class="custom_form_dialog">
        <el-form :model="form" :rules="formRules" ref="form">
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
                <el-input v-model="form.nickname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="帐号" :label-width="formLabelWidth" prop="username">
                <el-input v-model="form.username" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="form.password" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <OperButton customClass="fl" content="复原" type="info" icon="recover" @click="initEditForm"></OperButton>

            <el-button type="text" @click="closeEditDialog" size="medium" class="mr20i">取 消</el-button>
            <el-button type="primary" @click="edit(form)" size="medium" :loading="state.loadingDialog">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('system/admin')

    import { OperButton } from '@/components'

    export default {
        components: {OperButton},
        data() {
            return {
                formLabelWidth: '60px',
                form: {
                    nickname: '',
                    username: '',
                    password: ''
                },
                formRules: {
                    nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                        { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                    ],
                    username: [
                        { required: false, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: false, message: '请输入密码', trigger: 'blur' }
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
            editAdmin() {
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
