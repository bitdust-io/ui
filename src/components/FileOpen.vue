<template>
    <div class="user-files" v-bind:class="{open: isFileOpen}">
        <span @click="closeFile()">close</span>
        <h1>{{currentFile.name}}</h1>
        {{currentFile}}
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        methods: {
            ...mapActions([
                'getApiFiles',
                'deleteFile',
                'closeFile'
            ])
        },
        computed: {
            ...mapGetters([
                'getFiles',
                'isFileOpen',
                'currentFile'
            ])
        }
    };
</script>

<style scoped lang="scss">
    .user-files {
        background: #ccc;
        padding: 20px;
        position: fixed;
        right: -201px;
        width: 200px;
        top: 0;
        transition: all .3s ease-in-out;

        &.open {
            right: 0;
        }

        h1 {
            font-size: 16px;
            margin: 20px 0;
        }
    }

    li {
        list-style: none;
        color: #888;
        font-size: 18px;
        margin-top: 10px;

        span {
            background: red;
            color: white;
            padding: 5px;
            display: inline-block;
            cursor: pointer;
        }
    }

</style>
