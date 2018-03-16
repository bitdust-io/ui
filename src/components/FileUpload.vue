<template>
    <div>
        <div class="dropbox">
            drag any file here
            <input type="file"
                   :name="uploadFieldName"
                   @change="createFile($event.target)"
                   class="input-file">
        </div>
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

<style scoped>
    li {
        list-style: none;
        color: #888;
        font-size: 18px;
        margin-top: 10px;
    }

    .dropbox {
        outline: 2px dashed grey;
        outline-offset: -10px;
        background: #eee;
        color: dimgray;
        padding: 50px 30px;
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
        background: #ccc;
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
    }
</style>
