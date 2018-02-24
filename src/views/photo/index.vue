<template>
    <div class="wall">
        <div class="photo-wall">
            <template v-for="photo in photoList">
                <div class="photo" :style="photo.style" :title="photo.text">
                    <PhotoUpload
                        :imageUrl.sync="photo.imgUrl"
                        :sourceType="$global.uploadSourceType.HEAD_IMAGE"
                        :customImageStyle="photo.style"
                        :customBoxStyle="photo.style">
                    </PhotoUpload>
                </div>
            </template>
        </div>
    </div>
</template>

<script>

    import PhotoUpload from '@/views/file/upload/helper/PhotoUpload'

    export default {
        components: {PhotoUpload},
        data() {
            return {
                photoList: [
                    {//
                        text: '1_ 19.8 * 24.8', imgUrl: '',

                        style: {
                            width: '1.98cm',
                            height: '2.48cm',
                            left: '5.96cm',
                            top: '2.41cm'
                        }
                    },

                    {//
                        text: '2_ 12.8 * 17.8', imgUrl: '',

                        style: {
                            width: '1.28cm',
                            height: '1.78cm',
                            left: '6.31cm',
                            top: '0.30cm'
                        }
                    },
                    {//
                        text: '3_ 12.8 * 17.8', imgUrl: '',

                        style: {
                            width: '1.28cm',
                            height: '1.78cm',
                            left: '4.30cm',
                            top: '1.64cm'
                        }
                    },
                    {//
                        text: '4_ 12.8 * 17.8', imgUrl: '',

                        style: {
                            width: '1.28cm',
                            height: '1.78cm',
                            left: '8.28cm',
                            top: '4cm'
                        }
                    },

                    {//
                        text: '5_ 17.8 * 12.8', imgUrl: '',

                        style: {
                            width: '1.78cm',
                            height: '1.28cm',
                            left: '6.10cm',
                            top: '5.25cm'
                        }
                    },
                    { //
                        text: '6_ 17.8 * 12.8', imgUrl: '',

                        style: {
                            width: '1.78cm',
                            height: '1.28cm',
                            left: '11.2cm',
                            top: '2.00cm'
                        }
                    },
                    {//
                        text: '7_ 17.8 * 12.8', imgUrl: '',

                        style: {
                            width: '1.78cm',
                            height: '1.28cm',
                            left: '10.2cm',
                            top: '4.00cm'
                        }
                    },
                    {//
                        text: '8_ 17.8 * 12.8', imgUrl: '',

                        style: {
                            width: '1.78cm',
                            height: '1.28cm',
                            left: '2.2cm',
                            top: '2.12cm'
                        }
                    },
                    {
                        text: '9_ 17.8 * 12.8', imgUrl: '',

                        style: {
                            width: '1.78cm',
                            height: '1.28cm',
                            left: '1.2cm',
                            top: '4.00cm'
                        }
                    },

                    {//
                        text: '10_ 26', imgUrl: '',

                        style: {
                            width: '2.6cm',
                            height: '2.6cm',
                            left: '8.20cm',
                            top: '1cm',
                            'border-radius': '2.6cm'
                        }

                    },
                    {//
                        text: '11_ 20', imgUrl: '',

                        style: {
                            width: '2.0cm',
                            height: '2.0cm',
                            left: '3.60cm',
                            top: '4cm',
                            'border-radius': '2.0cm'
                        }

                    }
                ]
            }
        },
        created: function() {

        },
        watch: {

        },
        methods: {
            uploadSuccess(a, b) {
                console.log(a, '123', b)
//                this.imgUrl = imgUrl;
            }

        },
        computed: {

        }
    }
</script>

<style scoped>
    .wall{
        width: 100%;
        height: 20cm;
        background-color: #f8f8f8;
    }
    .photo-wall{
        position: relative;
        width: 13.9cm;
        height: 7.3cm;
        margin: 0px auto;
        background-color: #f1f1f1;
    }
    .photo{
        position: absolute;
        background-color: #ffffff;
        border: 0.1cm solid #cfcfcf;
        box-sizing: content-box;
    }
</style>
