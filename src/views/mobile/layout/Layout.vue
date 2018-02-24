<template id="mobile_main">
    <el-container>
        <el-header>
            <mt-header fixed :title="title"></mt-header>
        </el-header>
        <el-main>
            <mobile-main></mobile-main>
        </el-main>
    </el-container>
</template>

<script>
    import { MobileMain } from 'views/mobile/layout'

    export default {
        name: 'layout',
        components: {
            MobileMain
        },
        created: function() {

        },
        data() {
            return {
            };
        },
        computed: {
            title() {
                return this.$route.name;
            }
        }
    }
</script>
<style scoped>
    .el-header{
        text-align: center;
    }
</style>
