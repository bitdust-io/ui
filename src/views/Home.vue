<template>
    <div>
        <bit-header/>
        <div class="container">
            <navigation/>
            <div class="content">
                <h1 class="title" @click="setMenuActive('myFiles')">My files</h1>
                <h1 class="title" @click="setMenuActive('myShares')">Shared with me</h1>

                <div class="flex">
                    <div v-show="this.activeTab === 'myFiles'">
                        <files-upload/>
                        <user-files/>
                    </div>
                    <div v-show="this.activeTab === 'myShares'">
                        my shares content
                    </div>
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
        data() {
            return {
                activeTab: 'myFiles'
            };
        },
        components: {
            userFiles,
            filesUpload,
            fileOpen,
            navigation,
            bitHeader
        },
        methods: {
            setMenuActive(menu) {
                this.activeTab = menu;
            }
        },
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        }
    };
</script>

<style>
    .content {
        margin-left: 220px;
    }
</style>
