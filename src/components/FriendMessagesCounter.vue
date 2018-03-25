<template>
    <div>
        <div class="user-messages" v-if="userMessages.length > 0">
            <span class="messages">{{userMessages.length}}</span>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'friendMessagesCounter',
        data() {
            return {
                hasUnreadMessage: ''
            };
        },
        props: [
            'friend'
        ],
        methods: {},
        computed: {
            ...mapGetters([
                'getMessages',
                'currentFriend',
                'isFriendDetailsOpen'
            ]),
            userMessages() {
                if (!this.getMessages) return;
                return this.getMessages.filter(message => {
                    return message.result[0].sender.toLowerCase().includes(this.friend.global_id.toLowerCase());
                });
            },
            filteredList() {
                if (!this.getMessages) return;
                return this.getMessages.filter(message => {
                    return message.name.toLowerCase().includes(this.search.toLowerCase());
                });
            }
        },
        watch: {
            'currentFriend': function (resp) {
                this.hasUnreadMessage = !(this.friend.global_id === resp.global_id);
            }
        },
        created() {
        }
    };
</script>

<style scoped lang="scss">
    @import "../../static/css/variables";

    .messages {
        display: inline-block;
        background: red;
        border-radius: 100%;
        font-size: .7rem;
        width: 20px;
        height: 20px;
        color: $color-white;
        text-align: center;
        line-height: 1.2rem;
    }
</style>
