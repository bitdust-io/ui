<template>
    <div class="home">
        <div class="container">
            <navigation/>
            <div class="content">
                <ul class="sub-menu">
                    <li :class="{'active': (activeTab ==='myFiles')}"
                        @click="setMenuActive('myFiles')">MY FILES
                    </li>
                    <li class="separator"></li>
                    <li :class="{'active': (activeTab ==='myShares')}"
                        @click=" setMenuActive('myShares')">SHARED WITH ME
                    </li>
                </ul>

                <div v-show="this.activeTab === 'myFiles'">
                    <files-upload/>
                    <user-files/>
                </div>
                <div v-show="this.activeTab === 'myShares'">
                    <user-shared-files/>
                </div>
                <file-open/>
            </div>
        </div>
    </div>
</template>

<script>
    import userFiles from '../components/UserFiles';
    import userSharedFiles from '../components/UserSharedFiles';
    import filesUpload from '../components/FileUpload';
    import fileOpen from '../components/FileOpen';
    import navigation from '@/components/Navigation';
    import application from '../services/application';

    export default {
        name: 'home',
        data() {
            return {
                activeTab: 'myFiles'
            };
        },
        components: {
            userFiles,
            userSharedFiles,
            filesUpload,
            fileOpen,
            navigation
        },
        methods: {
            setMenuActive(menu) {
                this.activeTab = menu;
            }
        },
        created() {
            application.eventsListen();
            application.messagesListen();
        }
    };
</script>

<style lang="scss">
    .flex {
        display: flex;
    }
</style>
