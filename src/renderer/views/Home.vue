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

    export default {
        name: 'home-page',
        components: {
            userFiles,
            filesUpload,
            fileOpen
        },
        beforeCreate: function () {
            Api.eventsListen().then(data => {
            });
        }
    };
</script>

<style>
    .flex {
        /*display: flex;*/
    }
</style>
