<template>
    <grid-content>
        <div slot="menu">

            <files-upload class="upload" />

            <ul class="link-list">
                <li :class="{'active': (activeTab ==='myFiles')}"
                    @click="setMenuActive('myFiles')"
                    class="link">
                    <font-awesome-icon icon="user-circle" />
                    MY FILES
                </li>

                <li :class="{'active': (activeTab ==='myShares')}"
                    @click=" setMenuActive('myShares')"
                    class="link">
                    <font-awesome-icon icon="share-alt" />
                    SHARED WITH ME
                </li>
            </ul>
        </div>
        <div slot="main">
            <div v-show="this.activeTab === 'myFiles'">
                <file-list @open="openModal" />
            </div>
            <div v-show="this.activeTab === 'myShares'">
                <files-shared @open="openModal" />
            </div>
        </div>
    </grid-content>
</template>
<script>
    import fileList from '../components/Files/FileList';
    import filesShared from '../components/Files/FilesShared';
    import filesUpload from '../components/Files/FileUpload';
    import fileOpen from '../components/Files/FileOpen';
    import GridContent from '../components/Globals/GridContent';
    import ModalService from '@/services/modal';

    export default {
        name: 'Files',
        data() {
            return {
                activeTab: 'myFiles'
            };
        },
        components: {
            fileList,
            filesShared,
            filesUpload,
            GridContent
        },
        created() {
            document.getElementsByTagName('html')[0].classList.remove('intro-background');
        },
        methods: {
            setMenuActive(menu) {
                this.activeTab = menu;
            },
            openModal(file) {
                ModalService.openModal({
                    component: fileOpen,
                    type: 'center',
                    transitionFrom: 'top',
                    props: {fileName: file}
                });
            }
        }
    };
</script>
