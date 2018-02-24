
<template>
    <div class="quill-container">
        <!-- quill-editor -->
        <quill-editor v-model="content"
                      ref="myTextEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
                      @change="onEditorChange($event)">
            <div id="toolbar" slot="toolbar">
                <QuillEditorToobarConfig @multiple-select="handleMultipleSelect"></QuillEditorToobarConfig>
            </div>
        </quill-editor>

        <Finder ref="finderOnEdit"
                :multiple="true"
                :mimeType="$global.fileMimeType.IMAGE"
                @receiveSelected.self="insertImages"></Finder>

    </div>
</template>
<script>
    import QuillEditorToobarConfig from '@/components/fragment/QuillEditorToobarConfig'
    import Finder from '@/views/file/helper/Finder'
    import {quillEditor, Quill } from 'vue-quill-editor'

    import { ImageDrop } from 'quill-image-drop-module'
    import ImageResize from 'quill-image-resize-module'
    Quill.register('modules/imageDrop', ImageDrop)
    Quill.register('modules/imageResize', ImageResize)

    export default {
        props: {
            initContent: {
                type: String,
                default: ''
            }
        },
        components: {
            quillEditor, QuillEditorToobarConfig, Finder
        },
        data() {
            return {
                content: this.initContent,
                name: 'custom-toolbar',
                editorOption: {
                    placeholder: '请在此输入内容 ~',
                    modules: {
                        toolbar: '#toolbar',
                        history: {
                            delay: 1000,
                            maxStack: 50,
                            userOnly: false
                        },
                        imageDrop: true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        }
                    }
                }
            }
        },
        watch: {
            initContent(val) {
                this.content = val;// 监听变更并同步到initContent上
            },
            content(val) {
                this.$emit('contentChange', val);
            }
        },
        methods: {
            handleMultipleSelect() {
                this.$refs.finderOnEdit.openDialog();
            },
            uploadSuccess(url) {
                this.selectImageUrl = url;
            },
            submit() {
                this.editor.focus();
                this.editor.insertEmbed(this.editor.getSelection().index, 'image', this.uploadSuccessUrl);
                this.uploadImgDialog = false;
            },
            insertImages (selectionList) {
                console.log('receive selectionList : -> ', selectionList)
                _.forEach(selectionList, item => {
                    this.editor.focus();
                    this.editor.insertEmbed(this.editor.getSelection().index, 'image', item.url);
                })
            },
            resetDialog() {

            },
            onEditorBlur(editor) {
                // console.log('editor blur!', editor)
            },
            onEditorFocus(editor) {
                // console.log('editor focus!', editor)
            },
            onEditorReady(editor) {
                // console.log('editor ready!', editor)
            },
            onEditorChange({ editor, html, text }) {
                this.$emit('contentChange', html);
            }
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill;
            }
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
