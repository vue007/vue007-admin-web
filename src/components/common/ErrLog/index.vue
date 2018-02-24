<template>
    <div>
        <el-badge :is-dot="true" style="line-height: 30px;" @click.native="dialogTableVisible=true">
            <icon name="debug"  style="color: #F8C3CD;"></icon>
        </el-badge>
        <el-dialog title="bug日志" :visible.sync="dialogTableVisible">
            <el-table :data="logsList">
                <el-table-column label="message">
                    <template slot-scope="scope">
                        <div>msg:{{ scope.row.err.message }}</div>
                        <br/>
                        <div>url: {{scope.row.url}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="stack">
                    <template slot-scope="scope">
                        {{ scope.row.err.stack}}
                    </template>
                </el-table-column>

            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'errLog',
        props: {
            logsList: {
                type: Array
            }
        },
        data() {
            return {
                dialogTableVisible: false
            }
        }
    }
</script>

<style scoped>
    .bug-svg {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }
</style>
