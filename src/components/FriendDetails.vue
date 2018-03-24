<template>
    <div class="friend" v-bind:class="{open: isFriendDetailsOpen}">
        <span @click="closeFriend"
              class="close">close</span>

        <div v-for="message in getCurrentFriendData">
            <div v-for="item in message.messages">
                {{item.data.anything}}
            </div>
        </div>


        <h1>{{currentFriend.alias}}</h1>
        <h2>{{currentFriend.global_id}}</h2>

        <button @click="removeFriend(currentFriend.global_id)">remove friend</button>

        <h2>Chat</h2>
        <textarea v-model="message"/>

        <button @click="sendMessage()">send</button>

        <hr/>

        <user-messages/>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import userMessages from './UserMessages';
    import message from '../services/message';

    export default {
        components: {userMessages},
        data() {
            return {
                message: ''
            };
        },
        methods: {
            ...mapActions([
                'closeFriend',
                'removeFriend'
            ]),
            sendMessage() {
                message.sendMessage({
                    message: this.message,
                    user: this.currentFriend
                }).then(resp => {
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
                'isFriendDetailsOpen',
                'getCurrentFriendData',
                'getFriends',
                'getMessages'
            ])
        },
        watch: {
            'currentFriend': function (response) {
                if (response) {
                    this.resetOpenFriend();
                }
            },
            'isFriendDetailsOpen': function (response) {
                if (!response) {
                    this.resetOpenFriend();
                }
            },
            'getFriends': function (response) {
            }
        },
        mounted() {
            window.addEventListener('keyup', (ev) => {
                if (ev.code === 'Escape') {
                    this.closeFriend();
                }
            });
        },
        comments: [
            userMessages
        ]
    };
</script>

<style scoped lang="scss">
    .friend {
        background: #ccc;
        padding: 20px;
        position: fixed;
        right: -301px;
        width: 300px;
        top: 0;
        bottom: 0;
        transition: all .3s ease-in-out;

        &.open {
            transform: translate3d(-300px, 0, 0);
        }

        h1 {
            font-size: 16px;
            margin: 20px 0;
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

</style>
