<template>
    <div class="file-detail">
        <span class="icon-menu"></span>
        <div class="file-detail-content">
            <ul class="file-detail-list">
                <li><i class="icon-share-file"></i>Share</li>
                <li><i class="icon-download-file"></i>Download</li>
                <li class="delete">
                    <i class="icon-delete-file"></i>
                    Delete
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Api from '../services/api';

    export default {
        name: 'fileDetail',
        data() {
            return {};
        },
        props: {
            file: {
                type: Object
            }
        },
        methods: {
            ...mapActions([
                'getApiFiles',
                'deleteFile',
                'closeFile'
            ]),
            downloadFile() {
                this.downloadIsLoading = true;
                this.downloadSuccess = false;
                this.downloadError = false;
                Api.downloadFile(this.currentFile.path).then(resp => {
                    if (resp.ok) {
                        this.downloadSuccess = true;
                    } else {
                        this.downloadError = true;
                    }
                    this.downloadIsLoading = false;
                });
            },
            resetOpenFile() {
                this.downloadSuccess = false;
                this.downloadSuccess = false;
                this.downloadError = false;
            }
        },
        computed: {
            ...mapGetters([
                'getFiles',
                'isFileOpen',
                'currentFile'
            ])
        },
        watch: {
            'currentFile': function (response) {
                if (response) {
                    this.resetOpenFile();
                }
            },
            'isFileOpen': function (response) {
                if (!response) {
                    this.resetOpenFile();
                }
            }
        },
        mounted() {
            window.addEventListener('keyup', (ev) => {
                if (ev.code === 'Escape') {
                    this.closeFile();
                }
            });
        }
    };
</script>

<style scoped lang="scss">
    @import "../../static/css/imports";

    .file-detail {
        position: relative;
        z-index: 2;

        &:hover {
            .file-detail-content {
                display: block;
            }
        }
    }

    .file-detail-content {
        position: absolute;
        display: none;
        padding-left: 30px;
        margin: -42px 0 0 10px;

    }

    .file-detail-list {
        list-style: none;
        padding: 20px;
        border-radius: 1px;
        background-color: $color-white;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);

        &:before {
            content: '';
            position: absolute;
            left: 20px;
            width: 0;
            height: 0;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            border-right: 10px solid $color-white;
        }

        li {
            display: flex;
            margin: 0 0 15px;
            line-height: 22px;
            cursor: pointer;

            &:last-child {
                margin: 0;
            }

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .icon-menu {
        background: url("../assets/icons/icon-file-detail.svg") no-repeat center;
        position: relative;
        padding: 10px;
        cursor: pointer;
        display: inline-block;
    }

    [class^="icon-"], [class*=" icon-"] {
        width: 20px;
        height: 20px;
        display: inline-block;
        background-position: center left;
    }

    .delete {
        color: $color-red;
    }
</style>
