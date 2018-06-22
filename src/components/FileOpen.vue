<template>
    <div class="file-open" v-bind:class="{open: isFileOpen}">
        <div @click="stopPropagation($event)"
             class="file-open-container">
            <span @click="closeFile"
                  class="close">x
            </span>
            <div class="flex">
                <file-extension :file="currentFile.path"/>
                <h1>{{currentFile.name}}</h1>
            </div>

            <div class="buttons">
                <button @click="openShareFile(currentFile.path)"
                        class="btn btn-terciary">
                    Share
                </button>
                <button @click="downloadFile"
                        class="btn btn-primary">
                    Download
                </button>
                <button @click="deleteFile(currentFile)"
                        class="btn btn-secondary">
                    Delete
                </button>


                <div v-if="isSharingOpen"
                     class="share-wrapper">
                    <p class="share-text">Please select a friend to share this file:</p>

                    <ul class="friends-list">
                        <li v-for="friend in getFriends"
                            @click="selectFriendToShare(friend)"
                            :class="{active: selectedFriend.global_id === friend.global_id}">

                            <user-first-letter :name="friend.username"/>
                            {{friend.username}}

                        </li>
                    </ul>

                    <div class="share-buttons">
                        <button class="btn btn-secondary"
                                @click="isSharingOpen = false, selectedFriend = ''">Cancel
                        </button>

                        <button class="btn btn-terciary btn-share"
                                @click="shareFile()"
                                :disabled="!selectedFriend">Share
                        </button>
                    </div>
                </div>

                <p v-if="isSharing"
                   class="is-sharing">
                    Sharing file with: {{selectedFriend.username}}
                </p>

                <div v-if="downloadIsLoading">
                    Loading
                </div>
                <div v-if="downloadSuccess">
                    Download {{currentFile.path}} Success
                </div>
                <div v-if="downloadError">
                    Download {{currentFile.path}} Error
                </div>
            </div>
            <hr/>

            <div v-for="version in currentFile.versions">
                available: {{version.reliable}}
                uploaded: {{version.delivered}}
            </div>
        </div>
        <i @click="closeFile" class="wall"></i>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Api from '../services/api';
    import FileExtension from '../components/FileExtension';
    import userFirstLetter from '../components/UserFirstLetter';

    export default {
        data() {
            return {
                downloadSuccess: false,
                downloadError: false,
                downloadIsLoading: false,
                isSharingOpen: false,
                selectedFriend: '',
                isSharing: false

            };
        },
        components: {
            FileExtension,
            userFirstLetter
        },
        methods: {
            ...mapActions([
                'deleteFile',
                'closeFile',
                'getApiFriends',
                'updateCurrentFileData'
            ]),
            stopPropagation(event) {
                event.preventDefault();
            },
            downloadFile() {
                this.downloadIsLoading = true;
                this.downloadSuccess = false;
                this.downloadError = false;
                Api.downloadFile(this.currentFile.remote_path).then(resp => {
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
                this.isSharingOpen = false;
                this.selectedFriend = '';
                this.isSharing = false;
            },
            openShareFile() {
                this.isSharingOpen = true;
                this.getApiFriends();
            },
            selectFriendToShare(friend) {
                this.selectedFriend = friend;
            },
            shareFile() {
                this.isSharing = true;
                Api.shareFile(this.currentFile, this.selectedFriend).then(data => {
                    this.resetOpenFile();
                });
            },
            updateFileInfo() {
                Api.getFileInfo(this.currentFile).then(data => {
                    this.updateCurrentFileData(data.result[0].versions);
                });
            }
        },
        computed: {
            ...mapGetters([
                'isFileOpen',
                'currentFile',
                'getFriends',
                'connectionStatus'
            ])
        },
        watch: {
            'connectionStatus': function () {
                if (this.isFileOpen) {
                    this.updateFileInfo();
                }
            },
            'currentFile': function (response) {
                if (response) {
                    this.resetOpenFile();
                    this.updateFileInfo();
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
    @import "../../src/assets/scss/colors";

    .share-buttons {

        .btn {
            padding: 6px 10px;
            font-size: .8rem;
        }

        .btn-share {

            &:disabled {
                opacity: 0.3;
                cursor: auto;
            }
        }
    }

    .is-sharing {
        font-size: .9rem;
        margin-top: 10px;
        color: $color-red;
    }

    .share-wrapper {
        margin-top: 20px;
    }

    .active {
        padding: 3px;
        box-shadow: inset 0 0 2px $color-green;

        div {
            background: $color-green;
        }

    }

    .friends-list {
        display: flex;
        flex-flow: row wrap;

        li {
            text-align: center;
            padding: 6px;
            cursor: pointer;
            transform: scale(.8);
            border-radius: 10px;
            > div {
                margin: auto;
            }

            &:hover {
                opacity: 0.6;
            }
        }
    }

    .buttons {
        margin: 20px 0;
    }

    .flex {
        align-items: center;
    }

    .wall {
        background: rgba(0, 0, 0, .47);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
    }

    .file-open {
        padding: 20px;
        position: fixed;
        opacity: 0;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        transition: all .2s ease-in-out;
        z-index: 2;
        visibility: hidden;

        &.open, &.open .wall {
            opacity: 1;
            visibility: visible;
        }

        h1 {
            font-size: 16px;
            margin: 20px 0;
        }
    }

    li {
        list-style: none;
        color: #888;
        font-size: 18px;
        margin-top: 10px;

        span {
            background: red;
            color: white;
            padding: 5px;
            display: inline-block;
            cursor: pointer;
        }
    }

    hr {
        margin: 10px 0;
    }

    .file-open-container {
        margin: auto;
        width: 50%;
        background: $color-white;
        padding: 30px 50px;
    }

    .close {
        float: right;
        cursor: pointer;
        padding: 10px;
        color: $color-gray;
        font-size: 1.6rem;

        &:hover {
            opacity: .6;
            background: red;
            color: $color-white;
        }
    }

    .share-text {
        font-size: .9rem;
    }
</style>
