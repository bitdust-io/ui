<template>
    <div class="user-files">
        <h1>files</h1>

        <ul>
            <li v-for="item in getFiles">
                <span @click="deleteFile(item.path)"
                      class="delete">x</span>
                {{item.name}}
                <span @click="openFile(item.path)"
                      class="open">open</span>
            </li>
        </ul>
        <div v-if="isFileOpen">
            open
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    export default {
        data() {
            return {
                isFileOpen: false
            };
        },
        methods: {
            ...mapActions([
                'getApiFiles',
                'deleteFile',
                'openFile'
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
    li {
        list-style: none;
        color: #888;
        font-size: 18px;
        margin-top: 10px;

        .delete {
            background: red;
            color: white;
            padding: 5px;
            display: inline-block;
            cursor: pointer;
        }
        .open {
            background: green;
            color: white;
            padding: 5px;
            display: inline-block;
            cursor: pointer;
        }
    }

</style>
