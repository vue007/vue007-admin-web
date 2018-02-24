
<template>
    <div class="video-container">

        <div style="margin: 0;" class="tl">
            <d-player :video="video"
                      :autoplay="autoplay"
                      :contextmenu="contextmenu"
                      :screenshot="true"
                      @play="play"
                      ref="player"></d-player>
        </div>
        <div class="tc">
            <el-button class="search-item custom-search-button" size="mini" type="primary" plain
                       style="margin-top: 10px;"
                       @click="openFinder" >
                <icon  name="finder" scale="1.1" style="position: static;"></icon>
                选择视频
            </el-button>
        </div>

        <Finder ref="finderOnEdit"
                :multiple="false"
                :mimeType="$global.fileMimeType.VIDEO"
                @receiveSelected.self="changeVideo"></Finder>
    </div>
</template>
<script>
    import DPlayer from 'vue-dplayer'
    import Finder from '@/views/file/helper/Finder'

    export default {
        props: {
            initContent: {
                type: String,
                default: ''
            }
        },
        components: {
            DPlayer, Finder
        },
        data() {
            return {
                video: {
                    url: this.initContent ? this.initContent : 'http://3d-community.oss-cn-shenzhen.aliyuncs.com/video/1514182647676iphone-x.mp4',
                    pic: 'http://3d-community.oss-cn-shenzhen.aliyuncs.com/video/iphonex.png'
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
        watch: {
        },
        mounted() {
            let self = this;
            self.player = self.$refs.player.dp
        },
        created: function() {
        },
        methods: {
            openFinder() {
                this.$refs.finderOnEdit.openDialog();
            },
            inputFile(newFile, oldFile, prevent) {
                this.changeVideo();
            },
            play() {
            },
            changeVideo (selectionList) {
                let self = this;
                let videoUrl = selectionList[0].url;
                setTimeout(function() {
                    self.player.switchVideo({
                        url: videoUrl
                    });
                }, 1000);

                this.$emit('contentChange', videoUrl );
            }
        },
        computed: {
        }
    }
</script>


<style lang="scss">
    .quill-container{
        margin: 0px;
        width: 100%;
    }
    .quill-container .ql-editor{
        height: 30rem;
    }
    .ql-editor {
        min-height: 40em;
        padding-bottom: 1em;
    }
    .html {
        height: 9em;
        overflow-y: auto;
        border: 1px solid #ccc;
        border-top: none;
        resize: vertical;
    }
</style>
