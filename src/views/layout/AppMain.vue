<template>
    <section class="app-main" style="min-height: 100%">
        <tabs-view></tabs-view>
        <transition name="fade" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </section>
</template>

<script>
    import TabsView from './TabsView'
    export default {
        name: 'AppMain',
        components: {
            TabsView
        },
        computed: {
            key() {
                return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
            }
        }
    }
</script>
