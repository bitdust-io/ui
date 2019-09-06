<template>
    <div class="friend-chat">

        <div class="friend-header">
            <span @click="removeFriend(currentFriend.global_id)"
                  class="remove">remove friend</span>
        </div>

        <friend-messages :current-friend="currentFriend"/>

        <div class="message-sender"
             v-if="currentFriend.contact_state === 'CONNECTED'">

            <textarea v-model="userMessage"
                      placeholder="Type here..."
                      v-on:keydown="sendFromEnter"
                      ref="chat"
                      :disabled="isSending"
                      class="chat-input"
                      :rows="lines">
            </textarea>
            <button @click="sendMessage"
                    class="send"
            >
                Send
            </button>
        </div>

    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import friendMessages from './FriendMessages';
    import message from '../../services/message';

    export default {
        components: {
            friendMessages
        },
        props: {
            currentFriend: {
                type: Object
            }
        },
        data() {
            return {
                message: '',
                isSending: false,
                chat: '',
                rows: 1
            };
        },
        computed: {
            lines() {
                if (this.hasLine(this.userMessage)) {
                    this.resetOpenFriend();
                    return 1;
                }
                const lines = this.userMessage.split(/\r|\r\n|\n/);
                return lines.length;
            },
            userMessage: {
                get() {
                    return this.message.replace(/^[ \t]+/, '');
                },
                set(value) {
                    this.message = value;
                }
            }
        },
        methods: {
            ...mapActions([
                'removeFriend'
            ]),
            hasLine(value) {
                const regex = /^\s*$/g;
                const test = new RegExp(regex);
                return test.test(value);
            },
            sendMessage() {
                if (this.userMessage.length < 1) return;
                this.isSending = true;
                message.sendMessage({
                    message: this.userMessage,
                    user: this.currentFriend
                }).then(resp => {
                    console.log('Message was sent');
                    this.isSending = false;
                }).catch(() => {
                    // TODO Handle error
                });
                this.resetOpenFriend();
            },
            resetOpenFriend() {
                this.message = '';
                setTimeout(() => {
                    this.isSending = false;
                    this.focusOnInput();
                }, 20);
            },
            sendFromEnter(ev) {
                if (ev.keyCode === 13) {
                    if (!ev.shiftKey) {
                        this.sendMessage();
                    }
                }
            },
            focusOnInput() {
                if (this.$refs.chat && this.currentFriend.contact_state === 'CONNECTED') {
                    this.$nextTick(() => {
                        this.$refs.chat.focus();
                    });
                }
            }
        },
        mounted() {
            this.focusOnInput();
        },
        watch: {
            currentFriend() {
                this.focusOnInput();
                this.resetOpenFriend();
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .friend-chat {
        h2 {
            font-size: 1.4rem;
            text-transform: capitalize;
        }
    }

    .friend-header {
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

    .remove {
        cursor: pointer;
        color: $color-red;
        font-size: .8rem;
        padding: 4px;
    }

    .message-sender {
        position: absolute;
        background: $color-gray-3;
        bottom: 20px;
        right: 20px;
        left: 300px;
        display: flex;

        .chat-input {
            font-size: 1.1rem;
            border-radius: 8px;
            border: 2px solid $color-purple-1;
            resize: none;
            padding: 10px;
            width: 100%;
            max-height: 300px;
            overflow-y: auto;
            outline: none;
        }
    }

    .send {
        border: none;
        cursor: pointer;
        position: relative;
        font-size: 1rem;
        color: $color-white;
        background: $color-purple-1;
        padding: 10px 20px 10px 40px;
        border-bottom-right-radius: 20px;
        border-top-right-radius: 20px;
        margin-left: -14px;
        outline: none;

        &:hover {
            background: $color-blue-1;
        }

        &:before {
            left: 10px;
            top: 14px;
            content: '';
            width: 20px;
            height: 20px;
            position: absolute;
            background: url("../../assets/icons/icon-send.svg") no-repeat center;
        }
    }

</style>
