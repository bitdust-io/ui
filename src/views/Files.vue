<template>
    <div class="files">
        <div class="menu">
            <ul>
                <li :class="{'active': (activeTab ==='myFiles')}"
                    @click="setMenuActive('myFiles')">MY FILES
                </li>

                <li :class="{'active': (activeTab ==='myShares')}"
                    @click=" setMenuActive('myShares')">SHARED WITH ME
                </li>
            </ul>
        </div>
        <div class="main">
            <div v-show="this.activeTab === 'myFiles'">
                <files-upload/>
                <file-list/>
            </div>
            <div v-show="this.activeTab === 'myShares'">
                <files-shared/>
            </div>
            <file-open/>
        </div>
    </div>
</template>
<script>
    import fileList from '../components/Files/FileList';
    import filesShared from '../components/Files/FilesShared';
    import filesUpload from '../components/Files/FileUpload';
    import fileOpen from '../components/Files/FileOpen';

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
            fileOpen
        },
        created() {
            document.getElementsByTagName('html')[0].classList.remove('intro-background');
        },
        methods: {
            setMenuActive(menu) {
                this.activeTab = menu;
            }
        }
    };
</script>
<style lang="scss" scoped>

    @import "../assets/scss/includes.scss";

    .files {
        display: flex;
        justify-content: space-between;
        height: 100%;
        margin-top: 40px;
    }

    .menu {
        width: 300px;

        ul {

            li {
                list-style: none;
                cursor: pointer;
                padding: 10px;
                margin-right: 10px;
                font-size: .9rem;

                &.active {
                    color: $color-white;
                    background: $color-purple-1;
                }
            }
        }
    }

    .main {
        flex: 1;
    }
</style>
