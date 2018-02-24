<template>
    <el-dialog title="分类排序" custom-class="custom_form_dialog" width="400"
               :visible.sync="state.sortDialog"
               @open="initSortList" >
        <div class="mb50"
             v-loading="state.loadingDialog">
            <ul class="custom-draggable-list">
                <draggable v-model="sortList">
                    <transition-group>
                        <li v-for="item in sortList" :key='item.sort' >
                            <el-tag>
                                <icon name="draggable-x"></icon>
                                {{ $utils.formatStrLength(item.name, 5) }}
                            </el-tag>
                        </li>
                    </transition-group>
                </draggable>
            </ul>
        </div>
        <div slot="footer" class="custom-dialog-footer" >
            <!--<OperButton customClass="fl" content="重置" type="info" icon="reset" @click="resetDialog()"></OperButton>-->
            <OperButton customClass="fl" content="刷新还原" type="info" icon="refresh" @click="refreshDialog()"></OperButton>

            <el-button type="text" @click="closeSortDialog" size="medium" class="mr20i">取 消</el-button>
            <el-button type="primary" @click="sortCategory" size="medium" :loading="state.loadingDialog" >确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('category/article')

    import draggable from 'vuedraggable'
    import { OperButton } from '@/components'

    export default {
        components: {OperButton, draggable},
        data() {
            return {
                sortList: []
            }
        },
        methods: {
            ...mapActions([
                'sort',
                'getSortList',
                'closeSortDialog'
            ]),
            initSortList() {
                if (this.sortList.length && this.sortList[0].categoryType === this.state.searchData.categoryType) return;
                this.getSortList().then( () => {
                    this.sortList = _.orderBy( Object.assign([], this.state.sortList), ['sort'], ['asc'] );
                })
            },
            sortCategory() {
                this.state.loadingDialog = true;
                console.log(this.sortList, 'before')
                var sortList = this.$utils.makeListSort(this.sortList);
                console.log(sortList, 'end')
                this.sort( sortList ).then( () => {
                    this.sortList = [];
                    this.state.loadingDialog = false;
                }).catch(error => {
                    this.state.loadingDialog = false;
                    Promise.reject(error)
                });
            },
            resetDialog() {
                this.sortList = Object.assign([], this.state.sortList);
            },
            refreshDialog() {
                this.getSortList().then( () => {
                    this.sortList = _.orderBy( Object.assign([], this.state.sortList), ['sort'], ['asc'] );
                })
            }

        },
        computed: {
            ...mapState({
                state: state => state
            })
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
</style>
