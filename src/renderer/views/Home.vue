<template>
    <div>
        <h1 class="title">
            BitDust - home
        </h1>

        <div class="flex">
            <files-upload/>
            <user-files/>
            <file-open/>
        </div>
    </div>
</template>

<script>
    import Api from '../services/api';
    import userFiles from '../components/UserFiles';
    import filesUpload from '../components/FileUpload';
    import fileOpen from '../components/FileOpen';

    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'home-page',
        components: {
            userFiles,
            filesUpload,
            fileOpen
        },
        data() {
            return {
                fileList: {}
            };
        },
        methods: {
            ...mapActions([
                'increment',
                'decrement'
            ])
        },
        computed: {
            ...mapGetters([
                'getMain'
            ])
        },
        beforeCreate: function () {
            Api.eventsListen().then(data => {
            });
        },
        created() {
        }
    };
</script>

<style>
    .flex {
        /*display: flex;*/
    }
</style>
