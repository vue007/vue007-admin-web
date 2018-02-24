<template>
    <div style="position: absolute;background:#9cdeef;margin-top: -20px; height: 110%; width: 100%;">
        <div class="">
            <img class="pic-404__parent" :src="img_404" alt="404" style="height: 80%; width: 60%; margin-top:10%; margin-left: 10%;">
            <!--<div class="pic-404">-->
                <!--<img class="pic-404__child left" :src="img_404_cloud" alt="404">-->
                <!--<img class="pic-404__child mid" :src="img_404_cloud" alt="404">-->
                <!--<img class="pic-404__child right" :src="img_404_cloud" alt="404">-->
            <!--</div>-->
            <!--<div class="bullshit">-->
                <!--<div class="bullshit__oops">OOPS!</div>-->
                <!--<div class="bullshit__info">版权所有<a class='link-type' href='' target='_blank'>zed 3d 论坛</a></div>-->
                <!--<div class="bullshit__headline">{{ message }}</div>-->
                <!--<div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>-->
                <!--<a href="/" class="bullshit__return-home">返回首页</a>-->
            <!--</div>-->
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
                return '高总说这个页面你不能进......'
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
