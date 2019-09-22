<template>
    <grid-content>
        <div slot="menu">

            <files-upload class="upload"/>

            <ul class="link-list">
                <li :class="{'active': (activeTab ==='myFiles')}"
                    @click="setMenuActive('myFiles')"
                    class="link">
                    <font-awesome-icon icon="user-circle"/>
                    MY FILES
                </li>
                <li class="keys">
                    <span class="title">
                        <font-awesome-icon icon="key"/>
                        KEYS
                    </span>
                    <key-list @open="openKeyModal"
                              :active-tab="activeTab"
                              :open-key="openKey"
                              @setKey="setOpenKey"/>
                </li>

                <li :class="{'active': (activeTab ==='myShares')}"
                    @click=" setMenuActive('myShares')"
                    class="link">
                    <font-awesome-icon icon="share-alt"/>
                    SHARED WITH ME
                </li>
                <li class="keys">
                    <span class="title">
                        <font-awesome-icon icon="key"/>
                        KEYS
                    </span>
                    <key-list @open="openKeyModal"
                              :config="'share'"
                              :active-tab="activeTab"
                              :open-key="openKey"
                              @setKey="setOpenKey"/>
                </li>
            </ul>
        </div>
        <div slot="main">
            <div v-show="activeTab === 'myFiles'">
                <file-list @open="openFileModal"
                           :set-key="openKey"/>
            </div>
            <div v-show="activeTab === 'myShares'">
                <files-shared @open="openFileModal"
                              :set-key="openKey"/>
            </div>
        </div>
    </grid-content>
</template>
<script>
    import keyList from '../components/Files/KeyList';
    import fileList from '../components/Files/FileList';
    import filesShared from '../components/Files/FilesShared';
    import filesUpload from '../components/Files/FileUpload';
    import fileOpen from '../components/Files/FileOpen';
    import keyOpen from '../components/Files/KeyOpen';
    import GridContent from '../components/Globals/GridContent';
    import ModalService from '@/services/modal';

    export default {
        name: 'Files',
        data() {
            return {
                activeTab: 'myFiles',
                openKey: undefined
            };
        },
        components: {
            fileList,
            filesShared,
            filesUpload,
            GridContent,
            keyList
        },
        created() {
            document.getElementsByTagName('html')[0].classList.remove('intro-background');
        },
        methods: {
            setMenuActive(menu) {
                this.activeTab = menu;
                this.openKey = undefined;
            },
            openFileModal(file) {
                ModalService.openModal({
                    component: fileOpen,
                    type: 'center',
                    transitionFrom: 'top',
                    props: {fileName: file}
                });
            },
            openKeyModal(key) {
                ModalService.openModal({
                    component: keyOpen,
                    type: 'center',
                    transitionFrom: 'top',
                    props: key
                });
            },
            setOpenKey(config) {
                this.openKey = config.key;
                this.activeTab = config.isShare ? 'myShares' : 'myFiles';
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../assets/scss/includes.scss";

    .menu {
        .link {
            margin: 0;

            &.active {

                & + .keys {
                    border-left: 4px solid $color-purple-1;
                }
            }
        }
    }

    .keys {
        transition: border .3s ease;
        margin-bottom: 20px;

        .title {
            margin: 0 0 10px 18px;
            display: block;
            font-size: .8rem;
            padding-left: 10px;
            color: $color-gray-1;

            svg {
                margin-right: 4px;
            }
        }
    }
</style>
