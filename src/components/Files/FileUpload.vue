<template>
    <div class="dropbox">
        <font-awesome-icon icon="cloud-upload-alt" />
        UPLOAD FILE
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
        float: right;
        margin-right: 15px;
        background: $color-blue-1;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 100px;
        color: $color-white;
        font-size: 1rem;
        padding: 10px 20px;
        position: relative;
        cursor: pointer;
        transition: all .3s ease-in-out;

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

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
    }
</style>
