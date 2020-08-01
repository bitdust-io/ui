<template>
    <div class="notifications">
        <div v-if="downloadDone.status">
            <font-awesome-icon icon="times-circle"
                               class="close"
                               @click="closeDownloadNotification()"
            />
            <p>
                The file you requested to download is saved on: {{ downloadDone.data.output_location }}
            </p>
        </div>

        <div v-if="hasNewFile">
            <font-awesome-icon icon="times-circle"
                               class="close"
                               @click="closeNotification()"
            />
            <p>
                You have a new shared file: <strong>{{ fileFrom }}</strong>
            </p>
        </div>
        <div v-if="newMessage.sender">
            <font-awesome-icon icon="times-circle"
                               class="close"
                               @click="closeMessageNotification()"
            />
            <Icon name="chat"
                  class="chat"
                  size="xs" />
            <p>
                Message received from:
            </p>
            <span class="add-friend">{{ newMessage.sender }}
                <span v-if="!friendAdded" @click="addFriend(newMessage)">add as a friend</span>
                <span v-if="friendAdded">;)</span>
            </span>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import Icon from './Icon';
    import api from '../../services/api';

    export default {
        components: {
            Icon
        },
        data() {
            return {
                SHARED_FILE: 'shared-list-files-received',
                RESTORE_DONE: 'restore-done',
                hasNewFile: false,
                newMessage: {},
                fileFrom: '',
                friendAdded: false,
                downloadDone: {
                    status: false,
                    data: {
                        output_location: ''
                    }
                }
            };
        },
        methods: {
            ...mapActions([
                'getApiFriends',
                'getApiSharedFiles'
            ]),
            closeNotification() {
                this.hasNewFile = false;
            },
            closeMessageNotification() {
                this.newMessage = {};
            },
            closeDownloadNotification() {
                this.downloadDone.status = false;
            },
            addFriend(message) {
                api.addFriend(message.sender).then(resp => {
                    if (resp.result[0] === 'new friend has been added') {
                        this.getApiFriends();
                        this.friendAdded = true;
                    }
                });
            },
            playAlert() {
                const audio = new Audio(process.env.BASE_URL + 'mp3/notification_download.mp3');
                audio.play();
            },
            messageReceived(message) {
                this.playAlert();
                this.$buefy.snackbar.open({
                    message: `Message received from: ${message.sender.replace('master$', '')}`,
                    type: 'is-primary',
                    position: 'is-top-right',
                    actionText: 'Add as friend',
                    indefinite: true,
                    onAction: () => {
                        this.addFriend(message);
                        console.log('friend added');
                    }
                });
            }
        },
        computed: {
            ...mapGetters([
                'getEvent',
                'getLastMessage',
                'getFriends',
                'getIdentity'
            ])
        },
        watch: {
            getEvent(response) {
                if (response.payload.event_id === this.SHARED_FILE) {
                    this.hasNewFile = true;
                    this.fileFrom = response.payload.data.customer_idurl;
                    this.getApiSharedFiles();
                    this.playAlert();
                }
                if (response.payload.event_id === this.RESTORE_DONE) {
                    this.downloadDone.status = true;
                    this.downloadDone.data = response.payload.data;
                    this.playAlert();
                }
            },
            getLastMessage(response) {
                if (!response) return;
                let newMessage;
                let sender = response.sender.replace('master$', '');
                newMessage = this.getFriends.find(friend => friend.global_id === sender);
                if (!newMessage && (this.getIdentity.global_id !== sender)) {
                    this.messageReceived(response);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .icon-chat {
        margin-right: 6px;
        width: 24px;
        height: 24px;
    }

    .notifications {
        display: flex;

        & > div {
            z-index: 10;
            position: fixed;
            font-size: .8rem;
            margin-right: 20px;
            display: flex;
            align-items: center;
            background: $color-purple-1;
            padding: 10px;
            border: 1px solid $color-white;
            transition: background-color .3s;
            color: $color-white;
            border-radius: 8px;
            top: 20px;
            right: 20px;
            width: 500px;

            &:hover {
                background: $color-blue-1;
            }

            .icon {
                margin-right: 10px;
                width: 20px;
                height: 20px;
                border: 1px solid $color-white;
                border-radius: 50%;
                background: $color-blue-1;
                display: block;
            }

            .close {
                padding: 3px;
                margin: 0 10px 0 0;
                cursor: pointer;
                font-size: 2rem;
            }
        }
    }

    .chat {
        fill: $color-white;
        margin-right: 10px;
    }

    .add-friend {
        margin-left: 10px;

        span {
            display: none;
        }

        &:hover {
            position: relative;
            color: $color-red;

            span {
                display: block;
                position: absolute;
                background: $color-white;
                padding: 10px;
                margin-top: 0px;
                cursor: pointer;
                min-width: 100px;
            }
        }
    }
</style>
