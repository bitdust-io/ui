<template>
    <div class="home page">
        <bit-header/>
        <div class="container">
            <navigation/>
            <div class="content">
                <ul class="sub-menu">
                    <li class="title" v-bind:class="{'active': (activeTab ==='myFiles')}"
                        @click="setMenuActive('myFiles')">My files
                    </li>
                    <li class="title" v-bind:class="{'active': (activeTab ==='myShares')}"
                        @click=" setMenuActive('myShares')">Shared with me
                    </li>
                </ul>

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
    import {mapGetters} from 'vuex';
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
                'connectionStatus',
                'isFileOpen'
            ])
        }
    };
</script>

<style lang="scss">
    @import "../../static/css/variables.scss";

    .sub-menu {

        li {
            color: $color-blue-3;
            padding: 10px 0;
            margin: 0 10px 0 0;
            cursor: pointer;
            display: inline-block;

            &.active {
                color: $color-gray;
                font-weight: bold;
            }
        }
    }


</style>
