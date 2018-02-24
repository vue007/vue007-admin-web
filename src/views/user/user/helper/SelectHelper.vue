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
    const { mapState, mapActions } = createNamespacedHelpers('user/user')

    export default {
        props: {
            /* 用户类型 */
            userType: {
                type: Number,
                default: 100
            }
        },
        data() {
            return {}
        },

        created: function() {
            this.getSelectHelper(this.userType);
        },
        methods: {
            ...mapActions([
                'getSelectHelper'
            ])
        },
        computed: {
            ...mapState({
                selectHelperList: state => state.helper.selectHelperList
            })

        }
    }
</script>

<style scoped>

</style>
