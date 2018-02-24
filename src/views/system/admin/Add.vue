<template>
    <el-dialog title="新增管理员" :visible.sync="state.addDialog" custom-class="custom_form_dialog" >
        <el-form :model="form" :rules="formRules" ref="form" label-position="left">
            <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
                <el-input v-model="form.nickname" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="帐号" :label-width="formLabelWidth" prop="username">
                <el-input v-model="form.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model="form.password" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <OperButton customClass="fl" content="重置" type="info" icon="reset" @click="resetDialog()"></OperButton>

            <el-button type="text" @click="closeAddDialog" size="medium" class="mr20i">取 消</el-button>
            <el-button type="primary" @click="addAdmin" size="medium" :loading="state.loadingDialog" >确 定</el-button>
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
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            ...mapActions([
                'add',
                'closeAddDialog'
            ]),
            addAdmin() {
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
