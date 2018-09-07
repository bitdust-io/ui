<template>
    <div class="notifications">
        <div v-if="hasNewFile">
            <span class="icon"></span>
            <p>
                You have a new shared file: <strong>{{fileFrom}}</strong>
            </p>
            <Icon name="close"
                  class="close"
                  @click="closeNotification()"/>
        </div>
        <div v-if="newMessage.sender">
            <i class="icon-chat"></i>
            <p>
                Message received from:
            </p>
            <span class="add-friend">{{newMessage.sender}}
                <span v-if="!friendAdded" @click="addFriend(newMessage)">add as a friend</span>
                <span v-if="friendAdded">;)</span>
            </span>
            <Icon name="close"
                  class="close"
                  @click="closeMessageNotification()"/>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import userFirstLetter from './UserFirstLetter';
    import Icon from './Generic/Icon/Icon';
    import api from '../services/api';

    export default {
        components: {
            userFirstLetter,
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
                'getLastEvent',
                'getMessages',
                'getFriends',
                'getIdentity'
            ])
        },
        watch: {
            getLastEvent(response) {
                if (!response.result) return;
                response.result.forEach(resultItem => {
                    if (resultItem.id === this.SHARED_FILE) {
                        this.hasNewFile = true;
                        this.fileFrom = resultItem.data.customer_idurl;
                        this.getApiSharedFiles();
                    }
                });
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
    @import "../../src/assets/scss/colors";

    .icon-chat {
        margin-right: 6px;
        width: 24px;
        height: 24px;
    }

    .notifications {
        display: flex;

        & > div {
            font-size: .8rem;
            margin-right: 20px;
            display: flex;
            background: $color-blue;
            padding: 10px;
            border: 1px solid $color-white;
            transition: background-color .3s;

            &:hover {
                background: $color-blue-5;
            }

            .icon {
                margin-right: 10px;
                width: 20px;
                height: 20px;
                border: 1px solid $color-white;
                border-radius: 50%;
                background: $color-blue-5;
                display: block;
            }

            .close {
                padding: 3px;
                margin: 0 0 0 20px;
                cursor: pointer;
            }
        }
    }

    .add-friend {

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
                margin-top: 4px;
                cursor: pointer;
                min-width: 100px;
            }
        }
    }
</style>
