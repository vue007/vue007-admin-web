<template>
    <el-tooltip
        :class="customClass ? customClass : ''"
        :content="content ? content : '点点我'"
        :popper-class="'custom-tooltip-' + (type ? type : 'primary')"

        :placement="def.placement"
        :effect="def.effect"
        :open-delay="openDelay ? openDelay : def.openDelay"
        :enterable="def.enterable">
        <el-button
            @click="handleClick"
            :type="type ? type : 'primary'" :size="def.size" plain round class="custom-oper-button" :disabled="disabled ? disabled : false">
            <icon :name="icon ? icon : 'reject'" scale="2" ></icon>
        </el-button>
    </el-tooltip>
</template>

<script>
    export default {
        props: ['customClass', 'content', 'type', 'icon', 'openDelay', 'disabled'],
        data() {
            return {
                def: {
                    openDelay: 900,
                    placement: 'top',
                    effect: 'light',
                    enterable: false,
                    size: 'mini'
                }
            }
        },
        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            }
        }
    }
</script>

<style scoped>

</style>
