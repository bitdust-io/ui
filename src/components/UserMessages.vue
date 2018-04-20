<template>
    <div class="user-messages">

        <ul>
            <li v-for="item in userMessages">
                <span class="message">{{item.result[0].data.message}}</span>
            </li>
        </ul>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'userMessages',
        data() {
            return {
                search: ''
            };
        },
        methods: {},
        computed: {
            ...mapGetters([
                'getMessages',
                'currentFriend'
            ]),
            userMessages() {
                if (!this.getMessages) return;
                return this.getMessages.filter(message => {
                    if (!message.result || !message.result[0].sender) return;
                    return message.result[0].sender.toLowerCase().includes(this.currentFriend.global_id.toLowerCase());
                });
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
    @import "../../static/css/variables";

    ul {
        display: flex;
        flex-flow: row wrap;
    }

    input {
        border: 1px solid $color-gray-2;
        background: #FFFFFF;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        padding: 10px;
        font-size: .9rem;
    }

    ul {
        margin: 20px 0;
    }

    li {
        cursor: pointer;
        border-radius: 20px;
        width: 160px;
        list-style: none;
        font-size: .8rem;
        padding: 10px;
        margin: 10px;
        background: $color-white;

        &:hover {
            opacity: .6;
        }

    }
</style>
