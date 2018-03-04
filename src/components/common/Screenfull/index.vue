<template>
    <div @click='click' style="right:100px; line-height: 30px;">
        <icon id="myicon" name="fullscreen" scale="1.2" style="top: 3px; right:90px;"></icon>
    </div>
</template>

<script>
    import screenfull from 'screenfull'

    export default {
        name: 'hamburger',
        props: {
            width: {
                type: Number,
                default: 22
            },
            height: {
                type: Number,
                default: 22
            },
            fill: {
                type: String,
                default: '#48576a'
            }
        },
        data() {
            return {
                isFullscreen: false
            }
        },
        methods: {
            click() {
                if (!screenfull.enabled) {
                    this.$message({
                        message: 'you browser can not work',
                        type: 'warning'
                    })
                    return false
                }
                screenfull.toggle()
            }
        }
    }
</script>

<style scoped>
    .screenfull {
        display: inline-block;
        cursor: pointer;
    }

    #myicon {
        color: #6da8e3;
    }

    #myicon:hover {
        color: #fefefe;
    }
</style>
