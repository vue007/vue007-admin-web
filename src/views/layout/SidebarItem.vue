<template>
    <div class='menu-wrapper'>
        <template v-for="item in routes">
            <div v-if="!item.hidden&&item.noDropdown&&item.children.length>0"
                         @click="linkTo({ path: item.path+'/'+item.children[0].path, query: item.query, params: item.params })">
                <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
                    <template v-if='item.icon'>
                        <icon  v-if="isActive(item.path+'/'+item.children[0].path)" :name="item.icon" scale="1.3" class="menu-icon"></icon>
                        <icon  v-else :name="item.icon+'-o'" scale="1.3" class="menu-icon" ></icon>
                    </template>
                    <span>{{item.children[0].name}}</span>
                </el-menu-item>
            </div>
            <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
                <template slot="title">
                    <template v-if='item.icon'>
                        <icon  v-if="isSuperActive(item.path)" :name="item.icon" scale="1.3"  class="menu-icon"></icon>
                        <icon  v-else :name="item.icon+'-o'" scale="1.3"  class="menu-icon"></icon>
                    </template>
                    <span>{{item.name}}</span>
                </template>
                <template v-for="child in item.children" v-if='!child.hidden'>
                    <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]'></sidebar-item>
                    <div v-else
                                 @click="linkTo({ path: item.path+'/'+child.path, query: item.query, params: item.params })">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <template v-if='child.icon'>
                                <icon  v-if="isActive(item.path + '/' + child.path)" :name="child.icon" scale="1.3"  class="menu-icon"></icon>
                                <icon  v-else :name="child.icon+'-o'" scale="1.3"  class="menu-icon"></icon>
                            </template>
                            <span>{{child.name}}</span>
                        </el-menu-item>
                    </div>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'SidebarItem',
        methods: {
            isActive(path) {
                return path === this.$route.path
            },
            isSuperActive(path) {
                return this.$route.path.indexOf(path) !== -1;
            },
            isNotFromTab() {
                this.$store.state.app.isFromTab = false;
            },
            linkTo(data) {
                this.$store.dispatch('setIsFromTabFlag', false)
                this.$router.push(data)
            }
        },
        props: {
            routes: {
                type: Array
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .menu-icon{
        position: relative;
        top: 2px;
    }
</style>

