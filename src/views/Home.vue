<template>
    <div>
        <bit-header/>
        <div class="container">
            <navigation/>
            <div class="content">
                <h1 class="title">
                    My files
                </h1>

                <div class="flex">
                    <files-upload/>
                    <user-files/>
                    <file-open/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import userFiles from '../components/UserFiles';
    import filesUpload from '../components/FileUpload';
    import fileOpen from '../components/FileOpen';
    import {mapGetters, mapActions} from 'vuex';
    import navigation from '@/components/Navigation';
    import bitHeader from '@/components/BitHeader';

    export default {
        name: 'home',
        components: {
            userFiles,
            filesUpload,
            fileOpen,
            navigation,
            bitHeader
        },
        methods: {
            ...mapActions([
                'getIsConnected'
            ])
        },
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        }
    };
</script>

<style>
</style>
