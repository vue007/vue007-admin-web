<template>
    <span v-if="oper=='confirm'" style="margin-left: 5px;">
        <el-popover
            placement="top-start"
            :title="confirmTitle ? confirmTitle : '确定要删除？'"
            :width="width ? width : 200"
            trigger="click"
            v-model="visible"
            :popper-class="'custom-popper-confirm' + (type ? '-'+type : '')">
            <div style="display: block; font-size: 12px; margin: 16px 0 0 18px;">{{confirmText ? confirmText : '删除后将不予展示!'}}</div>
            <div style="text-align: left; margin: 15px 0 5px 0;">
                <CustomButton
                    :content="cancelText ? cancelText : '取消'"
                    :type="cancelType ? cancelType : 'info'"
                    :icon="cancelIcon ? cancelIcon : 'no'"
                    :openDelay="1"
                    @click="visible = false">
                </CustomButton>
                <CustomButton
                    :content="cancelText ? cancelText : '确认'"
                    :type="confirmType ? confirmType : type"
                    :icon="confirmIcon ? confirmIcon : 'yes'"
                    :openDelay="1"
                    @click="handleClick()">
                </CustomButton>
            </div>
            <CustomButton
                slot="reference"
                :customClass="customClass"
                :content="content"
                :type="type"
                :openDelay="1"
                :icon="icon"
                :disabled="disabled ? disabled : false">
            </CustomButton>
        </el-popover>
    </span>
    <span v-else-if="oper=='hoverShow'" style="margin-left: 5px;">
        <el-popover
            placement="top-start"
            :title="confirmTitle ? confirmTitle : ''"
            :width="width ? width : 200"
            trigger="hover"
            v-model="visible"
            :popper-class="'custom-popper-confirm' + (type ? '-'+type : '')">
            <div style="display: block; font-size: 12px; margin: 10px;">
                <slot></slot>
            </div>
            <CustomButton
                slot="reference"
                :customClass="customClass"
                :content="content"
                :type="type"
                :openDelay="99999"
                :icon="icon"
                :disabled="disabled ? disabled : false"
                @click="handleClick">
            </CustomButton>
        </el-popover>
    </span>
    <span v-else >
        <CustomButton style="margin-left: 5px;"
            :customClass="customClass"
            :content="content"
            :type="type"
            :icon="icon"
            :openDelay="1"
            :disabled="disabled ? disabled : false"
            @click="handleClick">
        </CustomButton>
    </span>
</template>

<script>
    import CustomButton from './CustomButton'
    export default {
        components: {CustomButton},
        props: [
            'oper',
            'cancelText', 'cancelType', 'cancelIcon',
            'confirmTitle', 'confirmText', 'confirmText', 'confirmType', 'confirmIcon', 'width',
            'customClass', 'content', 'type', 'icon', 'openDelay', 'disabled'
        ],
        data() {
            return {
                visible: false
            }
        },
        methods: {
            handleClick(evt) {
                this.visible = false;
                this.$emit('click', evt);
            }
        }
    }
</script>

<style scoped>
</style>
