<template>
    <div class="friend-messages">

        <div class="messages" ref="messages">

            <div ref="message">
                <ul>
                    <li v-for="(message, index) in oldMessages"
                        :key="index"
                        :class="{'mine': message.doc.sender.glob_id.replace('master$', '') !== currentFriend.global_id}">

                        <p class="message">
                            {{message.doc.payload.data.message}}
                        </p>

                        <p class="message-time">
                            {{new Date(message.doc.payload.time*1000).toLocaleString()}}
                        </p>

                        <div class="sender"
                             v-if="message.doc.sender.glob_id.replace('master$', '') === currentFriend.global_id">
                            <user-first-letter
                                :name="currentFriend.username"/>
                        </div>
                    </li>
                </ul>

                <ul>
                    <li v-for="(message, index) in userMessages"
                        :key="index"
                        :class="{'mine': message.sender.replace('master$', '') !== currentFriend.global_id}">

                        <p class="message">
                            {{message.data.message}}
                        </p>

                        <p class="message-time">
                            {{new Date(message.time*1000).toLocaleString()}}
                        </p>

                        <div class="sender"
                             v-if="message.sender.replace('master$', '') === currentFriend.global_id">
                            <user-first-letter
                                :name="currentFriend.username"/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import userFirstLetter from '../Globals/UserFirstLetter';
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
        components: {userFirstLetter},
        methods: {
            async loadChatHistory() {
                let messages = await Api.getMessageHistoryForUser(this.currentFriend);
                this.oldMessages = messages.result.reverse();
            },
            scrollDown() {
                setTimeout(() => {
                    this.$refs.messages.scrollTop = this.$refs.message.scrollHeight;
                }, 120);
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
            this.loadChatHistory();
            this.scrollDown();
        },
        watch: {
            currentFriend() {
                this.loadChatHistory();
                this.scrollDown();
            },
            getMessages() {
                this.scrollDown();
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .friend-messages {
        position: relative;
        height: calc(100% - 50px);
    }

    .messages {
        height: calc(100% - 50px);
        padding: 20px 20px 40px;
        overflow: auto;
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
        position: relative;
        border-radius: 10px;
        list-style: none;
        font-size: 1.1rem;
        padding: 3px 16px;
        margin: 10px 10px 20px 20px;
        background: $color-white;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.20);

        &.mine {
            margin-left: auto;
            background: $color-gray-2;
            color: $color-white;
        }
    }

    .sender {
        left: -30px;
        top: 24px;
        position: absolute;
        transform: scale(.6);
        opacity: .4;
        filter: grayscale(100%);
    }

    .no-messages-here {
        font-size: .8rem;
        margin-bottom: 20px;
    }

    .message-time {
        text-align: right;
        font-size: .7rem;
    }
</style>
