<template>
    <div class="file-detail">
        <span class="icon-menu">
            <font-awesome-icon icon="bars" />
        </span>
        <div class="file-detail-content">
            <ul class="file-detail-list">
                <li @click="downloadFile()">
                    <font-awesome-icon class="icon" icon="cloud-download-alt" />
                    Download
                </li>
                <li @click="deleteFile(file)" class="delete">
                    <font-awesome-icon icon="trash-alt" />
                    Delete
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import Api from '../../services/api';

    export default {
        name: 'fileDetail',
        data() {
            return {
                downloadSuccess: false,
                downloadError: false,
                downloadIsLoading: false
            };
        },
        props: {
            file: {
                type: Object
            }
        },
        methods: {
            ...mapActions([
                'deleteFile'
            ]),
            downloadFile() {
                this.downloadIsLoading = true;
                this.downloadSuccess = false;
                this.downloadError = false;
                Api.downloadFile(this.file.remote_path).then(resp => {
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
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .file-detail {
        position: relative;
        z-index: 2;

        &:hover {
            .file-detail-content {
                visibility: visible;
                opacity: 1;
            }
        }
    }

    .file-detail-content {
        display: block;
        visibility: hidden;
        opacity: 0;
        transition: all .2s ease-in-out;
        position: absolute;
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
        padding: 10px;
        cursor: pointer;
    }

    .icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        background-position: center left;
    }

    .delete {
        color: $color-red;
    }
</style>
