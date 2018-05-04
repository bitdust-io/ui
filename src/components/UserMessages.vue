<template>
    <div class="friend-messages">

        <ul>
            <li v-for="message in messages" :class="{'mine': message.sender === 'me'}">
                <p class="message">{{message.message}}</p>

                <div class="sender" v-if="message.sender !== 'me'">
                    <user-first-letter :name="currentFriend.username"/>
                </div>
            </li>
        </ul>

        <!--<ul>-->
        <!--<li v-for="item in userMessages">-->
        <!--<span class="message">{{item.result[0].data.message}}</span>-->
        <!--</li>-->
        <!--</ul>-->

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import userFirstLetter from './UserFirstLetter';

    export default {
        name: 'userMessages',
        data() {
            return {
                search: '',
                messages: [
                    {
                        sender: 'me',
                        message: 'Olá Veselin how are you ?',
                        timestamp: ''
                    },
                    {
                        sender: 'veselin@veselin-p2p.ru',
                        message: 'Im doing great!!!',
                        timestamp: ''
                    },
                    {
                        sender: 'me',
                        message: 'Olá Veselin how are you ?',
                        timestamp: ''
                    },
                    {
                        sender: 'veselin@veselin-p2p.ru',
                        message: 'Lets do it!',
                        timestamp: ''
                    },
                    {
                        sender: 'me',
                        message: 'Olá Veselin how are you ?',
                        timestamp: ''
                    },
                    {
                        sender: 'veselin@veselin-p2p.ru',
                        message: 'Lets do it!',
                        timestamp: ''
                    },
                    {
                        sender: 'me',
                        message: 'Olá Veselin how are you ?',
                        timestamp: ''
                    },
                    {
                        sender: 'veselin@veselin-p2p.ru',
                        message: 'Lets do it!',
                        timestamp: ''
                    },
                    {
                        sender: 'me',
                        message: 'Olá Veselin how are you ?',
                        timestamp: ''
                    },
                    {
                        sender: 'veselin@veselin-p2p.ru',
                        message: 'Lets do it!',
                        timestamp: ''
                    }
                ]
            };
        },
        components: {userFirstLetter},
        computed: {
            ...mapGetters([
                'getMessages',
                'currentFriend'
            ]),
            userMessages() {
                return this.messages;
                // if (!this.getMessages) return;
                // return this.getMessages.filter(message => {
                //     if (!message.result || !message.result[0].sender) return;
                //     return message.result[0].sender.toLowerCase().includes(this.currentFriend.global_id.toLowerCase());
                // });
            },
            filteredList() {
                if (!this.getMessages) return;
                return this.getMessages.filter(message => {
                    return message.name.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .friend-messages {
        height: 300px;
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
        max-width: 70%;
        border-radius: 20px;
        list-style: none;
        font-size: .9rem;
        padding: 8px 20px;
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
</style>
