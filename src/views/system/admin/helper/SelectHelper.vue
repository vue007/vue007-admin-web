<template>
    <div>
        <el-option
            v-for="item in selectHelperList"
            :key="item.id"
            :label="item.nickname"
            :value="item.id">
        </el-option>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('system/admin')

    export default {
        data() {
            return {}
        },

        created: function() {
            this.getSelectHelper();
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
