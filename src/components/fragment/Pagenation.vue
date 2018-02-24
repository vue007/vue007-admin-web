<template>
    <div class="block mt30 fr"  style="position: relative; left: 20px;">
        <el-pagination class="custom-pagination"
                       background small
                       @size-change="changePageSize"
                       @current-change="getData"
                       :current-page.sync="pageNum"
                       :page-sizes="pageSizes"
                       :page-size="pageSize"
                       :layout="layout"
                       :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        props: {
            pageNum: {
                type: Number,
                default: 1
            },
            pageSize: {
                type: Number,
                default: 10
            },
            total: {
                type: Number,
                default: 0
            },
            pageSizes: {
                type: Array,
                default: () => {
                    return [10, 20, 50, 100];
                }
            },
            layout: {
                type: String,
                default: 'prev, pager, next, sizes'
            }
        },
        data() {
            return {}
        },
        methods: {
            changePageSize(evt) {
                this.$emit('size-change', evt);
            },
            getData(evt) {
                this.$emit('current-change', evt);
            }
        }
    }
</script>

<style scoped>

</style>
