<template>
    <div class="dropbox">
        <font-awesome-icon icon="cloud-upload-alt" />
        UPLOAD
        <input type="file"
               :name="uploadFieldName"
               @change="createFile($event.target)"
               class="input-file">
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        data() {
            return {
                uploadFieldName: ''
            };
        },
        methods: {
            ...mapActions([
                'createFile'
            ])
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .dropbox {
        margin-bottom: 20px;
        background: $color-blue-1;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 100px;
        color: $color-white;
        font-size: 1rem;
        padding: 10px 20px;
        position: relative;
        cursor: pointer;
        transition: all .2s ease-in-out;
        text-align: center;

        &:hover {
            background: $color-purple-1;
            border-radius: 0;
        }
    }

    .input-file {
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
        width: 100%;
        position: absolute;
        cursor: pointer;
    }

</style>
