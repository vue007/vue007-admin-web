<template>
    <div class='tabs-view-container'>
        <draggable v-model="tabList" @end="endDraggable">
            <transition-group>
                <div class="tabs-view inline-block" v-for="tag in tabList"
                     @click="linkTo({ path: tag.redirect||tag.path, query: tag.query, params: tag.params })"
                     :key="tag.path"
                     style="margin-left: 4px;">
                    <el-tag size="mini" :closable="true" :type="isActive(tag.path)?'primary':''" style="padding: 0 2px; height: 17px; line-height: 17px;"
                            :class="isActive(tag.path)?'tab-tag-active':'tab-tag'" @close.stop='closeViewTabs(tag, $event)'>
                        {{tag.name}}
                    </el-tag>
                </div>
            </transition-group>
        </draggable>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        components: {draggable},
        computed: {
            visitedViews() {
                return _.orderBy( Object.assign([], this.$store.state.app.visitedViews), ['sort'], ['asc'] ).slice(-10)
            }
        },
        data() {
            return {
                tabList: []
            }
        },
        methods: {
            closeViewTabs(view, $event) {
                this.$store.dispatch('delVisitedViews', view).then((views) => {
                    if (this.isActive(view.path)) {
                        const latestView = views.slice(-1)[0]
                        if (latestView) {
                            this.$router.push(latestView.path)
                        } else {
                            this.$router.push('/')
                        }
                    }
                })
                $event.preventDefault()
            },
            generateRoute() {
                if (this.$route.matched[this.$route.matched.length - 1].name) {
                    return _.extend( this.$route.matched[this.$route.matched.length - 1], { query: this.$route.query }, { params: this.$route.params } )
                }
                this.$route.matched[0].path = '/'

                return _.extend( this.$route.matched[0], { query: this.$route.query }, { params: this.$route.params } )
            },
            addViewTabs() {
                this.$store.dispatch('addVisitedViews', this.generateRoute())
            },
            isActive(path) {
                return path === this.$route.path
            },
            endDraggable() {
                let self = this;
                let i = 0;
                _.forEach(this.tabList, function(obj) {
                    obj['sort'] = i;
                    i++;
                });
            },
            linkTo(data) {
                this.$store.dispatch('setIsFromTabFlag', true)
                this.$router.push(data)
            }
        },
        watch: {
            $route() {
                this.addViewTabs();
            },
            '$store.state.app.visitedViews': {
                handler: function() {
                    this.tabList = _.orderBy( _.assign([], this.$store.state.app.visitedViews), ['sort'], ['asc'] ).slice(-10);
                },
                deep: true
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .tabs-view-container {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 22px;
        line-height: 18px;
        padding-bottom: 2px;
        padding-right: 80px;
        border-bottom: solid 1px #eef0f6;
        /*background-color: #eff1f6;*/
        background-color: #fefefe;
        .tabs-view {
            cursor: default;
            margin-left: 10px;
        }
    }

    .tab-tag-active {
        background-color: #6eb6e2;
        border-color: #a0d0ee;
        color: #fefefe;
        border-radius: 1px;
    }

    .tab-tag {
        background-color: #fefefe;
        border-color: #eef0f6;
        color: #a1b1c4;
        border-radius: 1px;
        &:hover{
            background-color: #f4f4f4;
        }
    }

</style>
