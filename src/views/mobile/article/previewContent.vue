<template>
    <div class="preview-content">
        <h3>{{ article.title }}</h3>
        <div v-html="article.content">
        </div>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const { mapState, mapActions } = createNamespacedHelpers('content/article')

    export default {
        data() {
            return {
                article: {
                    title: '',
                    categoryId: '',
                    userId: '',
                    content: '',
                    contentType: 1
                }
            }
        },
        created: function() {
            this.detail(this.$route.query.id).then( data => {
                this.article = Object.assign({}, data);
            }).catch(error => {
                Promise.reject(error)
            });
        },
        methods: {
            ...mapActions([
                'detail'
            ])
        },
        computed: {
            ...mapState({
                state: state => state
            })
        }
    }
</script>

<style>
    .preview-content {width: 100%; background-color: #FEFEFE;}
    .preview-content h3 {margin-top: 1px; margin-bottom: 40px; font-size: 2em;}
    .preview-content img {width: 100% !important;}

</style>
