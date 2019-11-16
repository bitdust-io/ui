<template>
    <div class="friend-messages">

        <div class="messages"
             id="messages">

            <div ref="message"
                 class="messages-wrapper"
            >
                <ul>
                    <li v-for="(message, index) in oldMessages"
                        :key="index"
                        :class="{'mine': message.doc.sender.glob_id.replace('master$', '') !== currentFriend.global_id}">

                        <div>
                            <p class="user">
                                {{message.doc.sender.glob_id.replace('master$', '').replace(/\@(.*)/g, '')}}
                            </p>

                            <p class="message">{{message.doc.payload.data.message}}</p>
                        </div>
                        <p class="message-time">
                            {{new Date(message.doc.payload.time*1000).toLocaleString()}}
                        </p>
                    </li>
                </ul>

                <ul>
                    <li v-for="(message, index) in userMessages"
                        :key="index"
                        :class="{'mine': message.sender.replace('master$', '') !== currentFriend.global_id}">

                        <div>
                            <p class="user">
                                {{message.sender.replace('master$', '').replace(/\@(.*)/g, '')}}
                            </p>

                            <p class="message">{{message.data.message}}</p>

                        </div>

                        <p class="message-time">
                            {{new Date(message.time*1000).toLocaleString()}}
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Api from '../../services/api';

    export default {
        name: 'FriendMessages',
        props: {
            currentFriend: {
                type: Object
            }
        },
        data() {
            return {
                history: [],
                oldMessages: []
            };
        },
        methods: {
            ...mapActions(['resetMessages']),
            async loadChatHistory() {
                try {
                    let messages = await Api.getMessageHistoryForUser(this.currentFriend);
                    this.oldMessages = [];
                    this.oldMessages = messages.result.reverse();
                    this.scrollDown();
                } catch (e) {
                    console.log('Error getting history');
                }
            },
            scrollDown(isSmooth = false) {
                const el = window.innerWidth >= 768 ? this.main : this.messages;
                setTimeout(() => {
                    el.scroll({
                        top: this.$refs.message.scrollHeight,
                        behavior: isSmooth ? 'smooth' : 'instant'
                    });
                }, 40);
            }
        },
        computed: {
            ...mapGetters([
                'getMessages'
            ]),
            userMessages() {
                if (!this.getMessages) return;
                return this.getMessages.filter(message => {
                    if (!message || !this.currentFriend.global_id) return;

                    let newMessage = message.sender.replace('master$', '');

                    return newMessage.includes(this.currentFriend.global_id.toLowerCase()) ||
                        message.recipient.toLowerCase().includes(this.currentFriend.global_id.toLowerCase());
                });
            }
        },
        mounted() {
            this.messages = document.getElementById('messages');
            this.main = document.getElementById('main');
            this.main.classList.add('chat');
            this.loadChatHistory();
        },
        watch: {
            $route() {
                this.resetMessages();
                this.loadChatHistory();
            },
            getMessages() {
                this.scrollDown(true);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .friend-messages {
        position: relative;

        &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100px;
            z-index: 1;
            background: linear-gradient(to top, rgba(242, 242, 242, 0) 30%, rgba(242, 242, 242, 1) 100%);
        }

        @include breakpoint-down(sm) {
            &:before {
                display: none;
            }
        }
    }

    .messages {
        padding: 20px 20px 0;

        @include breakpoint-down(sm) {
            height: 400px;
            overflow-y: auto;
            padding-bottom: 100px;
        }
    }

    input {
        border: 1px solid $color-gray-2;
        background: $color-white;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        padding: 10px;
        font-size: .9rem;
    }

    li {
        font-size: 1rem;
        margin: 10px 0;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        background: $color-white;

        > div {
            width: 100%;
        }

        .user {
            text-transform: capitalize;
            font-weight: bold;
            color: $color-gray-1;
            font-size: .9rem;
            margin-bottom: 6px;
        }

        .message {
            word-wrap: break-word;
            white-space: pre-line;
            width: 90%;
        }

        &.mine {
            background: none;
        }
    }

    .sender {
        left: -24px;
        top: 1px;
        position: absolute;
        transform: scale(.4);
    }

    .no-messages-here {
        font-size: .8rem;
        margin-bottom: 20px;
    }

    .message-time {
        color: $color-gray-1;
        font-size: .7rem;
    }
</style>
