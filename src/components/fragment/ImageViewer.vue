<template>
    <el-popover
        :placement="placement"
        :width="width + 22"
        trigger="hover">
        <!-- hover 悬停 预览 -->
        <img :src="src" :width="width" style="max-height: 480px; max-width: 600px;"/>

        <!-- click 后预览 -->
        <div slot="reference">
            <template v-if="type === 'viewer'">
                <viewer  :images="[src]"
                         :key="src"
                         :options="options"
                         @inited="inited"
                         class="viewer" ref="viewer">
                    <!--<template slot-scope="scope">-->
                    <!--<slot></slot>-->
                    <!--</template>-->
                    <slot></slot>
                </viewer>
            </template>
            <template v-else-if="type === 'popover'">
                <slot></slot>
            </template>
        </div>
    </el-popover>

</template>

<script>
    import Viewer from 'v-viewer/src/component'

    export default {
        components: {
            Viewer
        },
        props: {
            type: {
                type: String,
                default: 'viewer'
            },
            placement: {
                type: String,
                default: 'right'
            },
            src: {
                type: String,
                default: ''
            },
            width: {
                type: Number,
                default: 300
            },
            options: {
                type: Object,
                default: () => {
                    return {
                        zIndex: 9999,
                        toolbar: {
                            zoomIn: 0,
                            zoomOut: 0,
                            oneToOne: 0,
                            reset: 0,
                            prev: 0,
                            play: {
                                show: 0
                            },
                            next: 0,
                            rotateLeft: 0,
                            rotateRight: 0,
                            flipHorizontal: 0,
                            flipVertical: 0
                        },
                        fullscreen: false,
                        navbar: false
                    };
                }
            }
        },
        data() {
            return {
            }
        },
        created: function() {
        },
        methods: {
            inited (viewer) {
                this.$viewer = viewer
            },
            show () {
                this.$viewer.show()
            }
        }
    }
</script>

<style scoped>

</style>
