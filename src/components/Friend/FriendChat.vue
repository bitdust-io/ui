<template>
    <div class="friend-chat">

        <div class="friend-header">
            <span @click="removeFriend(currentFriend.global_id)"
                  class="remove">remove</span>
        </div>

        <friend-messages :current-friend="currentFriend"/>

        <div class="message-sender">

            <textarea v-model="message"
                      placeholder="Type here..."
                      v-on:keydown="sendFromEnter"
                      ref="chat"
                      class="chat-input"
                      :disabled="isSending"
                      :class="{'icon-loading': isSending}"
                      :rows="lines">
            </textarea>
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
                let lines = this.message.split(/\r|\r\n|\n/);
                return lines.length;
            }
        },
        methods: {
            ...mapActions([
                'removeFriend'
            ]),
            sendMessage() {
                if (this.message.length < 3) return;
                this.isSending = true;
                message.sendMessage({
                    message: this.message,
                    user: this.currentFriend
                }).then(resp => {
                    this.isSending = false;
                    this.resetOpenFriend();
                }).catch(() => {
                    // TODO Handle error
                });
            },
            resetOpenFriend() {
                this.message = '';
                if (this.$refs.chat) {
                    this.$nextTick(() => {
                        this.$refs.chat.focus();
                    });
                }
            },
            sendFromEnter(ev) {
                if (ev.keyCode === 13) {
                    this.rows++;
                    if (!ev.shiftKey) {
                        this.sendMessage();
                    }
                }
            },
            focusOnInput() {
                if (this.$refs.chat) {
                    this.$nextTick(() => {
                        this.$refs.chat.focus();
                    });
                }
            }
        },
        mounted() {
            this.focusOnInput();
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .friend-chat {
        height: 100%;
        position: relative;
        z-index: 1;

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

    .close {
        cursor: pointer;
        font-size: .8rem;
        color: $color-blue-1;
    }

    .message-sender {
        position: absolute;
        background: $color-gray-3;
        bottom: 20px;
        right: 20px;
        left: 0;
        display: flex;

        .chat-input {
            font-size: 1.1rem;
            border-radius: 8px;
            border: 2px solid $color-purple-1;
            resize: none;
            padding: 10px;
            width: 100%;
        }
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
            background: url("../../assets/icons/icon-send.svg") no-repeat center;
        }
    }

</style>
