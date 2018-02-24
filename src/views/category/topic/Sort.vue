<template>
    <el-dialog title="帖子话题排序" :visible.sync="state.sortDialog" @open="initSortList" custom-class="custom_form_dialog" width="500">
        <div class="mb10 tc  clearfix" style="box-align: center;margin:0 auto; width:450px;"
             v-loading="state.loadingDialog">
            <ul class="custom-draggable-list tc" >
                <draggable v-model="sortList">
                    <transition-group>
                        <li v-for="(item, index) in sortList" :key='item.sort'  class="item" >
                            <div :style="'background-image: url('+item.imgUrl+'); background-size:100% 100%; border-radius: 2px; box-shadow: 3px 3px 4px #888888;'">
                                <icon name="draggable-x" ></icon>
                                {{ $utils.formatStrLength(item.name, 5) }}
                            </div>
                        </li>
                    </transition-group>
                </draggable>
            </ul>
        </div>
        <div slot="footer" class="custom-dialog-footer " >
            <!--<OperButton customClass="fl" content="重置" type="info" icon="reset" @click="resetDialog()"></OperButton>-->
            <OperButton customClass="fl" content="刷新还原" type="info" icon="refresh" @click="refreshDialog()"></OperButton>

            <el-button type="text" @click="closeSortDialog" size="medium" class="mr20i">取 消</el-button>
            <el-button type="primary" @click="sortCategory" size="medium" :loading="state.loadingDialog" >确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('category/topic')

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
                if (this.sortList.length) return;
                this.getSortList().then( () => {
                    this.sortList = _.orderBy( Object.assign([], this.state.sortList), ['sort'], ['asc'] );
                })
            },
            sortCategory() {
                this.state.loadingDialog = true;
                var sortList = this.$utils.makeListSort(this.sortList);
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

<style scoped>
    .custom-draggable-list .item { height:100px; width:120px; color: #eee; line-height: 100px;  font-weight: bold; }

</style>
