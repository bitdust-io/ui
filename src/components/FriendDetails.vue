<template>
    <div class="friend"
         :class="{open: isFriendDetailsOpen}">

        <div class="friend-header">
            <div>
                <user-first-letter :name="currentFriend.username"/>
                <h2>{{currentFriend.username}}</h2>
            </div>
            <span @click="closeFriend"
                  class="close">close</span>
        </div>

        <!--<button @click="removeFriend(currentFriend.global_id)">remove friend</button>-->

        <user-messages :from="currentFriend"/>

        <textarea v-model="message"></textarea>

        <button @click="sendMessage()">send</button>

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
    }

</style>
