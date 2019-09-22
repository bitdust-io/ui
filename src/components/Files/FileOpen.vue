<template>
    <div class="file-open">
        <div @click="stopPropagation($event)"
             class="file-open-container">
            <div class="flex">
                <file-extension :file="currentFile.path"/>
                <h1>{{currentFile.name}}</h1>
            </div>

            <div class="buttons"
                 :class="{'disabled': isFileLocked(currentFile.key_id)}">
                <button @click="openShareFile(currentFile.path)"

                        class="button slim">
                    Share
                </button>

                <button @click="downloadFile"
                        class="button primary">
                    Download
                </button>
                <button @click="deleteFile(currentFile)"
                        class="button slim">
                    Delete
                </button>

                <div v-if="isSharingOpen"
                     class="share-wrapper">
                    <p class="share-text">Please select a friend to share this file:</p>

                    <ul class="friends-list">
                        <li v-for="(friend, index) in getFriends"
                            :key="index"
                            @click="selectFriendToShare(friend)"
                            :class="{active: selectedFriend.global_id === friend.global_id}">

                            <user-first-letter :name="friend.username"/>
                            {{friend.username}}

                        </li>
                    </ul>

                    <div class="share-buttons">
                        <button class="button slim"
                                @click="isSharingOpen = false, selectedFriend = ''">Cancel
                        </button>

                        <button class="button slim button-share"
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
                    Requesting file.
                </div>
                <div v-if="downloadSuccess">
                    Download started.
                </div>
                <div v-if="downloadError">
                    Download {{currentFile.path}} error:
                    <span class="share-text">{{errorMessage}}</span>
                </div>
            </div>
            <hr/>

            <div v-for="(version , index) in currentFile.versions"
                 :key="index"
                 class="file-info">
                ({{index + 1}})
                Available: {{version.reliable}}
                Uploaded: {{version.delivered}}
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Api from '../../services/api';
    import FileExtension from './FileExtension';
    import userFirstLetter from '../Globals/UserFirstLetter';

    export default {
        data() {
            return {
                downloadSuccess: false,
                downloadError: false,
                downloadIsLoading: false,
                isSharingOpen: false,
                selectedFriend: '',
                isSharing: false,
                errorMessage: undefined

            };
        },
        props: {
            data: {
                type: Object
            }
        },
        components: {
            FileExtension,
            userFirstLetter
        },
        methods: {
            ...mapActions([
                'deleteFile',
                'getApiFriends',
                'updateCurrentFileData',
                'updateCurrentFile'
            ]),
            stopPropagation(event) {
                event.preventDefault();
            },
            downloadFile() {
                this.downloadIsLoading = true;
                this.downloadSuccess = false;
                this.downloadError = false;
                Api.downloadFile(this.currentFile.remote_path).then(resp => {
                    if (resp.status === 'OK') {
                        this.downloadSuccess = true;
                    } else {
                        this.errorMessage = resp.errors[0];
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
            async updateFileInfo() {
                try {
                    const {result} = await Api.getFileInfo(this.currentFile);
                    this.updateCurrentFileData(result[0].versions);
                } catch (e) {
                    console.log(e);
                }
            }
        },
        computed: {
            ...mapGetters([
                'currentFile',
                'getFriends',
                'connectionStatus',
                'isFileLocked'
            ])
        },
        watch: {
            'connectionStatus': function () {
                this.updateFileInfo();
            }
        },
        mounted() {
            this.resetOpenFile();
            this.updateCurrentFile(this.data.fileName);
            this.updateFileInfo();
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .file-info {
        font-size: .8rem;
    }

    .share-buttons {

        .button {
            padding: 6px 10px;
            font-size: .8rem;
        }

        .button-share {

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
        margin: 20px 10px;

        &.disabled * {
            opacity: .5;
            cursor: not-allowed;
            pointer-events: none;
        }

        .button {
            font-size: 1rem;
            margin: 20px 10px;
            padding: 5px 10px;
        }
    }

    .flex {
        align-items: center;
        display: flex;
    }

    .file-open {
        padding: 20px;

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

    .close {
        float: right;
        cursor: pointer;
        padding: 10px;
        color: $color-gray-1;
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
