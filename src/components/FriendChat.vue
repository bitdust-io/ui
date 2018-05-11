<template>
    <div class="friend"
         :class="{open: isFriendChatOpen}">

        <div class="friend-header">
            <div>
                <user-first-letter :name="currentFriend.username"/>
                <h2>{{currentFriend.username}}</h2>
            </div>
            <span @click="closeFriend"
                  class="close">close</span>
        </div>

        <user-messages :from="currentFriend"/>

        <div class="flex">
        <textarea v-model="message"
                  class="chat-input"
                  rows="1"></textarea>

            <button @click="sendMessage()"
                    :disabled="!isSending && this.message.length === 0"
                    class="send">Send
            </button>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import userMessages from './UserMessages';
    import message from '../services/message';
    import userFirstLetter from './UserFirstLetter';

    export default {
        components: {
            userMessages, userFirstLetter
        },
        data() {
            return {
                message: '',
                isSending: false
            };
        },
        methods: {
            ...mapActions([
                'closeFriend',
                'removeFriend',
                'addMessage'
            ]),
            sendMessage() {
                this.isSending = true;
                if (!this.message) return;
                message.sendMessage({
                    message: this.message,
                    user: this.currentFriend
                }).then(resp => {
                    this.isSending = false;
                    this.resetOpenFriend();
                });
            },
            resetOpenFriend() {
                this.message = '';
            }
        },
        computed: {
            ...mapGetters([
                'currentFriend',
                'isFriendChatOpen',
                'getIdentity'
            ])
        },
        watch: {
            'currentFriend': function (response) {
                if (response) {
                    this.resetOpenFriend();
                }
            },
            'isFriendChatOpen': function (response) {
                if (!response) {
                    this.resetOpenFriend();
                }
            }
        },
        mounted() {
            window.addEventListener('keyup', (ev) => {
                if (ev.code === 'Escape') {
                    this.closeFriend();
                }
            });
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .friend-header {
        background: $color-white;
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        > div {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .user-messages {
        min-height: 300px;
        padding: 10px 20px;
    }

    .friend {
        background: #F8F8F8;
        position: fixed;
        width: 400px;
        right: 20px;
        bottom: -610px;
        transition: all .2s ease-in-out;
        box-shadow: -2px 1px 2px 0 rgba(0, 0, 0, 0.09);
        border-radius: 5px;
        padding-bottom: 20px;

        &.open {
            transform: translate3d(0, -600px, 0);
        }

        h2 {
            font-size: 1.4rem;
            text-transform: capitalize;
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

    .close {
        cursor: pointer;
        font-size: .8rem;
    }

    .chat-input {
        border: none;
        resize: none;
        padding: 10px;
        margin-left: 10px;
        width: 280px;
    }

    .flex {
        display: flex;
        padding: 10px 30px 0 0;
    }

    .send {
        border: none;
        cursor: pointer;
        position: relative;
        font-size: .9rem;
        color: $color-white;
        background: $color-gray-3;
        padding: 10px 20px 10px 40px;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;

        &:hover {
            opacity: .6;
        }

        &:before {
            left: 10px;
            top: 9px;
            content: '';
            width: 20px;
            height: 20px;
            position: absolute;
            background: url("../assets/images/icons/icon-send.svg") no-repeat center;
        }
    }


</style>
