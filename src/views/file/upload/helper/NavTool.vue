<template>
    <!-- 导航栏工具 目前用于展示上传状态 -->
    <icon v-if="state.uploadList.length || state.uploadedList.length"
          name="upload" scale="1.5" style="top: 3px; right:130px; "
          :class="state.uploading ? 'upload-nav-tool-icon-uploading' : 'upload-nav-tool-icon'">

    </icon>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('file/upload');

    export default {
        components: {
        },
        data() {
            return {
                status: 1
            }
        },
        computed: {
            ...mapState({
                state: state => state
            })
        },
        methods: {
            ...mapActions([
            ])
        }
    }
</script>

<style scoped>
    .upload-nav-tool-icon {
        color: #e1e1e1;
    }
    .upload-nav-tool-icon-uploading {
        animation: changeColor 3s infinite linear;
    }
    @keyframes changeColor {
        0% {  color: #e1e1e1;  }
        /*10% {  color: hsl(203, 67%, 80%);  }*/
        /*20% {  color: hsl(203, 67%, 75%);  }*/
        /*30% {  color: hsl(203, 67%, 70%);  }*/
        /*40% {  color: hsl(203, 67%, 65%);  }*/
        50% {  color: hsl(203, 67%, 60%);  }
        /*60% {  color: hsl(203, 67%, 60%);  }*/
        /*70% {  color: hsl(203, 67%, 65%);  }*/
        /*80% {  color: hsl(203, 67%, 70%);  }*/
        /*90% {  color: hsl(203, 67%, 75%);  }*/
        100% {  color: #e1e1e1;  }
    }

</style>
