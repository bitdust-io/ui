<template>
    <div class="friend-messages">

        <div v-if="userMessages.length === 0"
             class="no-messages-here">
            No new messages here...
        </div>
        <div class="messages">
            <ul>
                <li v-for="item in userMessages"
                    :class="{'mine': item.sender.replace('master$', '') !== currentFriend.global_id}">

                    <p class="message">
                        {{item.data.message}}
                    </p>

                    <p class="message-time">
                        {{new Date(item.time*1000).toLocaleString()}}
                    </p>

                    <div class="sender"
                         v-if="item.sender.replace('master$', '') === currentFriend.global_id">
                        <user-first-letter
                            :name="currentFriend.username"/>
                    </div>
                </li>
            </ul>
            <div class="chat-history">
                <h3>Older messages</h3>
                <ul>
                    <li v-for="message in oldMessages"
                        :class="{'mine': message.doc.sender.glob_id.replace('master$', '') !== currentFriend.global_id}">

                        <p class="message">
                            {{message.doc.payload.data.message}}
                        </p>

                        <p class="message-time">
                            {{new Date(message.doc.payload.time*1000).toLocaleString()}}
                        </p>
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
        name: 'userMessages',
        data() {
            return {
                history: [],
                oldMessages: []
            };
        },
        components: {userFirstLetter},
        methods: {
            loadChatHistory() {
                Api.getMessageHistoryForUser(this.currentFriend).then(data => {
                    this.oldMessages = data.result;
                });
            }
        },
        computed: {
            ...mapGetters([
                'currentFriend',
                'getMessages'
            ]),
            userMessages() {
                if (!this.getMessages) return;
                let messages = this.getMessages.filter(message => {
                    if (!message || !this.currentFriend.global_id) return;

                    let newMessage = message.sender.replace('master$', '');

                    return newMessage.includes(this.currentFriend.global_id.toLowerCase()) ||
                        message.recipient.toLowerCase().includes(this.currentFriend.global_id.toLowerCase());
                });
                return messages.reverse();
            }
        },
        mounted() {
            this.loadChatHistory();
        },
        watch: {
            currentFriend() {
                this.loadChatHistory();
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .friend-messages {
        height: 360px;
        padding: 20px;
    }

    .messages {
        height: 280px;
        overflow: auto;
        padding-bottom: 100px;
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
        max-width: 80%;
        border-radius: 10px;
        list-style: none;
        font-size: 1.1rem;
        padding: 3px 16px;
        margin: 10px 10px 20px 20px;
        background: $color-white;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.20);

        &.mine {
            margin-left: auto;
            background: $color-purple-2;
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

    .chat-history {
        h3 {
            font-size: .8rem;
        }
    }
</style>
