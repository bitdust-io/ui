<template>
    <div class="dropbox">
        UPLOAD FILE
        <input type="file"
               :name="uploadFieldName"
               @change="createFile($event.target)"
               class="input-file">
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        data() {
            return {
                uploadFieldName: ''
            };
        },
        methods: {
            ...mapActions([
                'getApiFiles',
                'createFile'
            ])
        },
        computed: {
            ...mapGetters([
                'getFiles'
            ])
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .dropbox {
        float: right;
        margin-right: 15px;
        background: $color-blue-4;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 100px;
        color: $color-white;
        padding: 10px 20px;
        position: relative;
        cursor: pointer;
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

    .dropbox:hover {
        background: $color-blue-3;
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
    }
</style>
