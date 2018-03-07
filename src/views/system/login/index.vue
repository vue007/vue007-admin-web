<template>
    <el-row class="login-panel" :gutter="24">
        <el-col :sm="15" :xs="0"
                class="login-banner hidden-xs-only">
            <div class="login-logo">
                <img src="https://avatars1.githubusercontent.com/u/34916802?s=200&raw=true" />
            </div>
        </el-col>
        <el-col :sm="9" :xs="24"
                class="login-box ">

            <div class="login-form" >
                <h3 class="title text-3d">
                    <span>vue007 admin</span>
                </h3>
                <el-form class="" autoComplete="on" :model="loginForm" :rules="loginRules"
                         ref="loginForm"
                         label-position="left">
                    <el-form-item prop="username">
                        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="帐号">
                            <icon slot="prefix" name="user" scale="1.2"></icon>
                        </el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin"
                                  v-model="loginForm.password"
                                  autoComplete="on"
                                  placeholder="密码">
                            <icon slot="prefix" name="lock" scale="1.2"></icon>
                            <span slot="suffix" @click='showPwd' >
                                <icon :name="pwdType ? 'eye' : 'eye-open'" scale="1.2"></icon>
                            </span>
                        </el-input>
                    </el-form-item>

                    <el-button type="primary" class="login-btn" :loading="loading" style="width: 100%;"
                               @click.native.prevent="handleLogin">登 录
                    </el-button>

                </el-form>
            </div>

        </el-col>
    </el-row>
</template>

<script>
    import {isvalidUsername} from '@/utils/validate'

    export default {
        name: 'login',
        data() {
            const validateUsername = (rule, value, callback) => {
                if (!isvalidUsername(value)) {
                    callback(new Error('请输入正确的用户名'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'))
                } else {
                    callback()
                }
            }
            return {
                loginForm: {
                    username: 'admin',
                    password: '123456'
                },
                loginRules: {
                    username: [{required: true, trigger: 'blur', validator: validateUsername}],
                    password: [{required: true, trigger: 'blur', validator: validatePassword}]
                },
                pwdType: 'password',
                loading: false,
                showDialog: false
            }
        },
        methods: {
            showPwd() {
                if (this.pwdType === 'password') {
                    this.pwdType = ''
                } else {
                    this.pwdType = 'password'
                }
            },
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        this.$store.dispatch('system/login/LoginByUsername', this.loginForm).then(() => {
                            this.loading = false
                            this.$router.push({path: '/'})
                            // this.showDialog = true
                        }).catch(() => {
                            this.loading = false
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            }
        },
        created() {
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    ::-webkit-scrollbar {display:none}
    @import "src/styles/mixin.scss";

    $bg: #434343;
    $dark_gray: #889aa4;
    $light_gray: #7b7b7b;

    .login-panel {
        height: 100%;
        .login-banner {
            height: 100%;
            background-color: $bg;


            .login-logo{
                position: fixed;
                background: url('https://avatars1.githubusercontent.com/u/34916802?s=200&raw=true');
                background-repeat: no-repeat;
                background-position: center;
                background-size: cover;
                -webkit-filter: blur(15px);
                -moz-filter: blur(15px);
                -o-filter: blur(15px);
                -ms-filter: blur(15px);
                filter: blur(15px);
                width:40%;
                left: 10%;
                top: 30%;
                text-align: center;
                img {
                    width: 80%;
                    margin: 0 auto;
                }
            }
        }

        .login-box {
            height: 100%;
            background-color: #ffffff;

            .login-form{
                position: relative;
                top: 40%;
                transform: translateY(-40%);
                width: 90%;
                margin: 0 auto;

                input button{
                    width: 100% ;
                }

                .title{
                    height:8%;
                    font-size: 46px;
                    color: #51A8DD;
                    text-align: center;
                }

            }
        }
    }

    .text-3d {
        position: relative;
    }

    .text-3d span {
        text-shadow: 0 -1px 0 #51A8DD,
        0 1px 10px rgba(110, 182, 226, .6),
        0 6px 1px rgba(110, 182, 226, .1),
        0 0 5px rgba(110, 182, 226, .15),
        0 1px 3px rgba(110, 182, 226, .18),
        0 3px 5px rgba(110, 182, 226, .15)
        /*0 7px 10px rgba(110, 182, 226, .20),*/
        /*0 15px 10px rgba(110, 182, 226, .1),*/
        /*0 25px 15px rgba(110, 182, 226, .1);*/
    }

</style>
