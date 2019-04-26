<template>
    <div class="notifications">
        <div v-if="hasNewFile">
            <span class="icon"></span>
            <p>
                You have a new shared file: <strong>{{fileFrom}}</strong>
            </p>
            <Icon name="close"
                  class="close"
                  @click="closeNotification()" />
        </div>
        <div v-if="newMessage.sender">
            <Icon name="chat"
                  class="chat"
                  size="xs" />
            <p>
                Message received from:
            </p>
            <span class="add-friend">{{newMessage.sender}}
                <span v-if="!friendAdded" @click="addFriend(newMessage)">add as a friend</span>
                <span v-if="friendAdded">;)</span>
            </span>
            <Icon name="close"
                  class="close"
                  size="xs"
                  @click="closeMessageNotification()" />
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Icon from './Icon';
    import api from '../../services/api';

    export default {
        components: {
            Icon
        },
        data() {
            return {
                SHARED_FILE: 'shared-list-files-received',
                hasNewFile: false,
                newMessage: {},
                fileFrom: '',
                friendAdded: false
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
            addFriend(message) {
                api.addFriend(message.sender).then(resp => {
                    if (resp.result[0] === 'new friend has been added') {
                        this.getApiFriends();
                        this.friendAdded = true;
                    }
                });
            }
        },
        computed: {
            ...mapGetters([
                'getEvent',
                'getMessages',
                'getFriends',
                'getIdentity'
            ])
        },
        watch: {
            getEvent(response) {
                if (response.id === this.SHARED_FILE) {
                    this.hasNewFile = true;
                    this.fileFrom = response.data.customer_idurl;
                    this.getApiSharedFiles();
                }
            },
            getMessages(response) {
                if (!response) return;
                let newMessage;
                response.forEach(message => {
                    let _sender = message.sender.replace('master$', '');
                    newMessage = this.getFriends.find(friend => friend.global_id === _sender);
                    if (!newMessage && (this.getIdentity.global_id !== _sender)) this.newMessage = message;
                });
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
        align-content: start;

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
                margin: 0 0 0 20px;
                cursor: pointer;
                fill: $color-white;
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
