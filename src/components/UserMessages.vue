<template>
    <div class="friend-messages">

        <div v-if="userMessages.length === 0"
             class="no-messages-here">
            No messages here...
        </div>

        <ul>
            <li v-for="item in userMessages"
                :class="{'mine': item.sender !== currentFriend.global_id}">
                <p class="message">{{item.data.message}}</p>
                <p class="message-time">{{new Date(item.time*1000).toLocaleString()}}</p>
                <div class="sender" v-if="item.sender === currentFriend.global_id">
                    <user-first-letter :name="currentFriend.username"/>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import userFirstLetter from './UserFirstLetter';

    export default {
        name: 'userMessages',
        components: {userFirstLetter},
        computed: {
            ...mapGetters([
                'currentFriend',
                'getMessages'
            ]),
            userMessages() {
                if (!this.getMessages) return;
                let messages = this.getMessages.filter(message => {
                    if (!message) return;
                    return message.sender.toLowerCase().includes(this.currentFriend.global_id.toLowerCase()) ||
                        message.recipient.toLowerCase().includes(this.currentFriend.global_id.toLowerCase());
                });
                return messages.reverse();
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .friend-messages {
        height: 360px;
        padding: 20px;
    }

    ul {
        height: 280px;
        overflow: auto;
        padding-bottom: 100px;
    }

    input {
        border: 1px solid $color-gray-2;
        background: #FFFFFF;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        padding: 10px;
        font-size: .9rem;
    }

    li {
        position: relative;
        max-width: 80%;
        border-radius: 20px;
        list-style: none;
        font-size: 1.1rem;
        padding: 6px 20px;
        margin: 10px 10px 20px 20px;
        background: $color-white;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.20);

        &.mine {
            margin-left: auto;
            background: $color-blue-5;
            color: $color-white;
        }
    }

    .sender {
        left: -30px;
        top: 24px;
        position: absolute;
        transform: scale(.4);
        opacity: .4;
        filter: grayscale(100%);
    }

    .no-messages-here {
        font-size: .8rem;
    }

    .message-time {
        text-align: right;
        font-size: .8rem;
    }
</style>
