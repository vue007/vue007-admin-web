<template>
    <div style="position: absolute;background:#9cdeef;margin-top: -20px; height: 110%; width: 100%;">
        <div class="">
            <img class="pic-404__parent" :src="img_404" alt="404" style="height: 80%; width: 60%; margin-top:10%; margin-left: 10%;">
        </div>
    </div>
</template>

<script>
    import img_404 from '@/assets/404_images/404.gif'
    import img_404_cloud from '@/assets/404_images/404_cloud.png'

    export default {
        data() {
            return {
                img_404,
                img_404_cloud
            }
        },
        computed: {
            message() {
                return '习总说这个页面你不能进......'
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
