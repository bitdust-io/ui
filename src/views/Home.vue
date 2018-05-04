<template>
    <div class="home page">
        <bit-header/>
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
                    my shares content
                </div>
                <file-open/>
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
    @import "../../src/assets/scss/colors";
    @import "../../src/assets/scss/mixins";

    .flex {
        display: flex;
    }

    .sub-menu {

        height: 60px;

        li {
            color: $color-blue-3;
            padding: 10px 0;
            /*margin: 0 10px 0 0;*/
            cursor: pointer;
            display: inline-block;
            font-size: 1.2rem;

            &.active {
                color: $color-gray;
                font-weight: bold;
            }
        }

    }

    li.separator {
        @include separator;
        position: relative;
        margin: 0 14px;

        &:before {
            left: 1px;
        }

        &:after {
            left: 0;
        }

        &:before, &:after {
            position: absolute;
            top: 4px;
            height: 20px;
        }
    }


</style>
