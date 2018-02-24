<template>
    <el-container>
        <el-header class="header-container mt20" style="min-height: 60px; padding-left: 19px; padding-right: 0px;">
            <el-form :inline="true" :model="form" :rules="rules" ref="editForm" >
                <el-form-item label="" prop="categoryType">
                    <el-radio-group disabled
                                    class="search-item"  v-model="form.categoryType" size="mini">
                        <el-radio-button class="custom-tab-radio"
                                         v-for="item in $global.articleTypeMap"
                                         :key="item.value"
                                         :label="item.value">
                            {{item.label}}
                        </el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item  label="" prop="categoryId">
                    <el-select class="search-item" v-model="form.categoryId" size="mini" placeholder="分类"  style="width: 90px;"
                               filterable clearable>
                        <ArticleCategorySH :categoryType="form.categoryType"></ArticleCategorySH>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="userId">
                    <el-select class="search-item" v-model="form.userId" size="mini" placeholder="发帖人"  style="width: 100px;"
                               filterable clearable>
                        <UserSH :userType="$global.userType.SYSTEM"></UserSH>
                    </el-select>
                </el-form-item>
                <el-form-item label="" prop="title">
                    <el-input class="search-item" v-model="form.title" size="mini" placeholder="标题" style="width: 260px; display: inline-block;"></el-input>
                </el-form-item>
            </el-form>
            <template v-if="form.categoryType != $global.articleType.WALLPAPER">
                <div
                    key="1_2"
                    class="inline-block fr" style="position: relative; top: -50px; left: 20px;">
                    <el-popover
                        ref="popover-poster"
                        placement="bottom-end"
                        title=""
                        style="min-width: 240px; padding-left: 10px;"
                        trigger="hover">
                        <ImageUpload
                            :imageUrl="form.poster"
                            :sourceType="$global.uploadSourceType.HEAD_IMAGE"
                            @success="uploadSuccess">
                        </ImageUpload>
                    </el-popover>

                    <template v-if="form.poster == ''">
                        <div class="inline-block" style="position: relative; left: -40px; top: 6px; width: 90px;"
                             v-popover:popover-poster >
                            <el-button size="mini" type="info" plain>
                                上传封面图
                            </el-button>
                        </div>
                    </template>
                    <template v-else>
                        <div class="inline-block pl0 ml0 fr" v-popover:popover-poster >
                            <img :src="form.poster" class="poster-image"/>
                            <span style="position:relative; left: -50px; top: -7px; color: #666; font-size: 13px;">封面</span>
                        </div>
                    </template>
                </div>
            </template>
            <template v-else>
                <div
                    key="3"
                    class="inline-block fr" style="position: relative; top: -40px; left: -20px;">
                    <el-switch
                        v-model="form.type"
                        active-color="#51A8DD"
                        :active-value="0"
                        inactive-color="#86C166"
                        :inactive-value="1">
                    </el-switch>
                    <div class="inline-block co7" style="position: relative; left: 2px; z-index: 2; font-size: 12px;">
                        <template v-if="form.type == 0">
                            2D
                        </template>
                        <template v-else>
                            3D
                        </template>
                    </div>
                </div>
            </template>

        </el-header>

        <el-main style="padding-top: 0px;">
            <!-- 图文内容 -->
            <template v-if="form.categoryType == $global.articleType.IMAGE_TEXT">
                <QuillEditor @contentChange="recieveContent" :initContent="form.content"></QuillEditor>
            </template>

            <!-- 视频内容 -->
            <template v-if="form.categoryType == $global.articleType.VIDEO">
                <VideoEditor :initContent="form.content"
                             @contentChange="recieveContent"></VideoEditor>
            </template>

            <!-- 壁纸内容 -->
            <template v-if="form.categoryType == $global.articleType.WALLPAPER">
                <div class="tc">
                    <ImageUpload
                        type="finder"
                        :customBoxStyle="{'height': '480px', 'width': '100%', 'padding': '120px'}"
                        :customImageStyle="{'max-height': '680px', 'max-width': '100%'}"
                        :imageUrl="form.content"
                        :sourceType="$global.uploadSourceType.WALLPAPER"
                        @success="uploadWallpaperSuccess">
                    </ImageUpload>
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

                <el-button v-if="form.categoryType == $global.articleType.IMAGE_TEXT" type="primary" plain @click="handleEdit"
                           style="float:right; margin-right: 0px;">保存</el-button>
                <el-button v-if="form.categoryType == $global.articleType.VIDEO" :disabled="form.content == ''" type="primary" plain @click="handleEdit"
                           style="float:right; margin-right: 0px;">保存</el-button>
                <el-button v-if="form.categoryType == $global.articleType.WALLPAPER" :disabled="form.content == ''" type="primary" plain @click="handleEdit"
                           style="float:right; margin-right: 0px;">保存</el-button>

                <el-button type="text" @click="$router.push({path: '/content/article'})"
                           style="float:right; margin-right: 20px;">返回</el-button>
            </div>
        </el-footer>
    </el-container>
</template>
<script>
    /* eslint-disable require-yield,generator-star-spacing,prefer-const */

    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('content/article')

    import { getToken } from '@/utils/auth'

    import QuillEditor from './helper/QuillEditor'
    import VideoEditor from './helper/VideoEditor'
    import OperButton from '@/components/fragment/OperButton'
    import ArticleCategorySH from '@/views/category/article/helper/SelectHelper'
    import UserSH from '@/views/user/user/helper/SelectHelper'
    import ImageUpload from '@/views/file/upload/helper/ImageUpload'
    import FileUpload from 'vue-upload-component'
    import qrcode from '@xkeshi/vue-qrcode'

    export default {
        components: {
            QuillEditor, qrcode,
            OperButton, ImageUpload, VideoEditor, FileUpload,
            ArticleCategorySH, UserSH
        },
        data() {
            return {
                form: {
                    id: '',
                    title: '',
                    categoryId: '',
                    userId: '',
                    poster: '',
                    content: '',
                    categoryType: this.$global.articleType.IMAGE_TEXT,

                    type: 0
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
                        { required: true, message: '请选择用户', trigger: 'change' }
                    ]
                }
            }
        },
        created: function() {
            let self = this;
            this.detail({
                id: this.$route.query.id,
                categoryType: parseInt(this.$route.query.categoryType)
            }).then( data => {
                // this.form = _.pick(data, _.keys(this.form));
                this.form = _.pick(data, _.keys(this.form));
                this.form.content = data.content;
//                this.video.url = data.content;
//                this.video.pic = data.poster;

//                self.$nextTick(function () {
//                    self.player = self.$refs.player.dp
//                })
            }).catch(error => {
                Promise.reject(error)
            });
        },
        watch: {
        },
        methods: {
            ...mapActions([
                'detail',
                'edit'
            ]),
            handleTypeChange(tab, event) {// 类型切换时 清空内容 重置内容
                this.form.categoryId = '';
                this.form.content = '';
                this.form.type = 0;
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
            handleAddWallpaper() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.add(this.form).then( data => {
                            this.routerSuccess(data);
                        }).catch(error => {
                            Promise.reject(error)
                        });
                    } else {
                        this.$message.error('请补全相关信息!');
                        return false;
                    }
                });
            },
            uploadSuccess(url) {
                this.form.poster = url;
            },
            uploadWallpaperSuccess(url) {
                this.form.content = url;
            },
            routerSuccess(data) {
                this.$confirm('请选择下一步操作！', '创建成功', {
                    confirmButtonText: '继续编辑此文',
                    cancelButtonText: '创建新文章',
                    type: 'success'
                }).then(() => {
                    this.resetInfo();
                    this.$router.push(
                        {
                            path: '/content/edit_article',
                            query: {id: data.id}
                        }
                    );
                }).catch(() => {
                    this.resetInfo();
                    this.clearContent();
                });
            },
            recieveContent(html) {
                this.form.content = html;
            },
            resetInfo() {
                this.form.title = '';
                this.form.categoryId = '';
                this.form.userId = '';
                this.form.poster = '';
                this.form.type = 0;
            },
            clearContent() {
                this.form.content = '';
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


<style lang="scss" scoped>
    .content-container {
        margin-right: 10%;
    }
    .poster-image {
        position: relative;
        left: -8px;
        display:inline-block; width:100px; height:26px; margin-top:7px; border-radius: 2px; opacity: 0.5;
        border: 1px solid #86C166;
        box-shadow: 3px 3px 2px #c2deb1;
    }

    .dplayer {
        width: 100%;
        margin: 10px 0 20px 0;
    }


</style>


