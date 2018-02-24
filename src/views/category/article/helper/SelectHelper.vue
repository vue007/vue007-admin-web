<template>
    <div>
        <el-option
            v-for="item in selectHelperList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('category/article')
    import global from '@/utils/global' // 全局filter

    export default {
        props: {
            categoryType: {
                type: Number,
                default: global.articleType.IMAGE_TEXT
            }
        },
        data() {
            return {
            }
        },
        watch: {
            'categoryType': function() {
                this.getSelectHelper(this.categoryType);
            }
        },
        created: function() {
            this.getSelectHelper(this.categoryType);
        },
        methods: {
            ...mapActions([
                'getSelectHelper'
            ])
        },
        computed: {
            ...mapState({
                selectHelperList: state => state.selectHelperList
            })

        }
    }
</script>

<style scoped>

</style>
