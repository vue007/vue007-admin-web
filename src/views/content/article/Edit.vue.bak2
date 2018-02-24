<template>
    <el-container>
        <el-aside width="10%">
            <el-tabs v-model="form.contentType"  tab-position="left" @tab-click="handleTabClick"
                     style="margin-top: 80px; margin-left: 5%; float: right;">
                <el-tab-pane
                    :disabled="true"
                    v-for="item in $global.articleTypeMap"
                    :key="item.value"
                    :label="item.label"
                    :name="item.value"></el-tab-pane>
            </el-tabs>
        </el-aside>

        <el-container>
            <el-header class="mt20" style="min-height: 60px;">
                <el-form :inline="true" :model="form" :rules="rules" ref="editForm" >
                    <el-form-item label="" prop="title">
                        <el-input v-model="form.title" size="mini" placeholder="标题" style="width: 300px;"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="categoryId">
                        <el-select v-model="form.categoryId" size="mini" placeholder="分类"  style="width: 100px;">
                            <ArticleCategorySH></ArticleCategorySH>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="userId">
                        <el-select v-model="form.userId" size="mini" placeholder="发帖人"  style="width: 100px;">
                            <UserSH :userType="$global.userType.SYSTEM"></UserSH>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="poster">
                        <el-popover
                            placement="right"
                            title=""
                            width="200"
                            trigger="click">
                            <ImgUploader
                                :defaultImg.sync="form.poster"
                                :url="uploadUrl"
                                @success="uploadSuccess">
                            </ImgUploader>
                            <el-button slot="reference" size="mini" type="info" plain  style="width: 100px;">{{ form.poster == '' ? '上传封面图' : '封面图' }}</el-button>
                        </el-popover>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main style="padding-top: 0px;">
                <template v-if="form.contentType == 1">
                    <QuillEditor @contentChange="recieveContent" :initContent="form.content"></QuillEditor>
                </template>
                <template v-if="form.contentType == 2">
                    <div style="margin: 0;" class="tl">

                        <d-player :video="video"
                                  :autoplay="autoplay"
                                  :contextmenu="contextmenu"
                                  :screenshot="true"
                                  @play="play"
                                  ref="player"></d-player>

                    </div>
                </template>
            </el-main>
            <el-footer>
                <div >
                    <OperButton customClass="fl" content="手机扫码预览" type="info" icon="iphone" oper="hoverShow" width="250" @click="previewContent">
                        <qrcode :value="previewUrl" :options="{ size: 200 }"></qrcode>
                        <div style="text-align: center;">扫描二维码，可在手机端预览</div>
                        <div style="text-align: center;">点击此按钮，打开新窗口预览</div>
                    </OperButton>

                    <el-button v-if="form.contentType == $global.articleType.IMAGE_TEXT" type="primary" plain @click="handleEdit"
                               style="float:right; margin-right: 0px;">保存</el-button>
                    <el-button v-if="form.contentType == $global.articleType.VIDEO" :disabled="form.content == ''" type="primary" plain @click="handleEdit"
                               style="float:right; margin-right: 0px;">保存</el-button>

                    <el-button type="text" @click="$router.push({path: '/content/article'})"
                               style="float:right; margin-right: 20px;">返回</el-button>
                </div>
            </el-footer>
        </el-container>
    </el-container>



</template>
<script>
    /* eslint-disable require-yield,generator-star-spacing,prefer-const,indent */
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('content/article')

    import { getToken } from '@/utils/auth'
    import { OperButton } from '@/components'
    import QuillEditor from './helper/QuillEditor'
    import ArticleCategorySH from '@/views/category/article/helper/SelectHelper'
    import UserSH from '@/views/user/user/helper/SelectHelper'
    import ImgUploader from '@/components/common/ImgUploader/index'
    import FileUpload from 'vue-upload-component'
    import DPlayer from 'vue-dplayer'

    import qrcode from '@xkeshi/vue-qrcode'

    export default {
        components: {
            OperButton, QuillEditor, ArticleCategorySH, UserSH, ImgUploader, qrcode, FileUpload, DPlayer
        },
        data() {
            return {
                uploadUrl: process.env.BASE_API + '/api/upload/fileupload?type=' + this.$global.uploadSourceType.ARTICLE_IMAGE,
                form: {
                    title: '',
                    categoryId: '',
                    userId: '',
                    poster: '',
                    content: '',
                    contentType: 1
                },
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        { min: 2, max: 40, message: '长度在 2 到 40 个字符', trigger: 'blur' }
                    ],
                    categoryId: [
                        { required: true, message: '请选择分类', trigger: 'change' }
                    ],
                    userId: [
                        { required: true, message: '请选择一个用户', trigger: 'change' }
                    ]
                },
                video: {
                    url: 'http://3d-community.oss-cn-shenzhen.aliyuncs.com/video/1514182647676iphone-x.mp4',
                    pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
                },
                autoplay: true,
                player: null,
                contextmenu: [
                    {
                        text: '',
                        link: ''
                    }
                ]
            }
        },
        created: function() {
            let self = this;
            this.detail({
                id: this.$route.query.id,
                categoryType: this.$route.query.categoryType
            }).then( data => {
                this.form = Object.assign({}, data);
                this.video.url = data.content;
                this.video.pic = data.poster;

                self.$nextTick(function () {
                    self.player = self.$refs.player.dp
                })
            }).catch(error => {
                Promise.reject(error)
            });
        },
        methods: {
            ...mapActions([
                'detail',
                'edit'
            ]),
            handleTabClick(tab, event) {
                this.form.content = '';// 类型切换时 清空内容
            },
            inputFile(newFile, oldFile, prevent) {
                this.changeVideo();
            },
            play() {
            },
            changeVideo() {
                var self = this;
                setTimeout(function() {
                    self.player.switchVideo({
                        url: self.files[0].url
                    });
                }, 1000)
            },
            uploadSuccess(url) {
                this.form.poster = url;
            },
            handleEdit() {
                this.$refs['editForm'].validate((valid) => {
                    if (valid) {
                        this.edit(this.form).then( () => {
                            //
                        }).catch(error => {
                            Promise.reject(error)
                        });
                    } else {
                        this.$message.error('请补全相关信息!');
                        return false;
                    }
                });
            },
            recieveContent(html) {
                this.form.content = html;
            },
            resetForm() {
                this.$refs['editForm'].resetFields();
            },
            previewContent() {
//                window.open('http://www.w3school.com.cn')
                window.open(
                    this.previewUrl
                ,
                '预览', 'width=480, height=800');
            }
        },
        computed: {
            ...mapState({
                state: state => state
            }),
            previewUrl: function() {
                return process.env.PREVIEW_URL + '/#/mobile/article/previewContent?' +
                    '&id=' + this.$route.query.id +
                    '&x-token=' + getToken() +
                    '&nickename=' + this.$store.getters.nickname +
                    '&username=' + this.$store.getters.username;
            }
        }
    }
</script>


<style lang="scss">
    .content-container {
        margin-left: 10%;
        margin-right: 10%;
        overflow: auto;
    }
    .dplayer {
        width: 98%;
        margin: 10px 0 20px 0;
    }
</style>1


