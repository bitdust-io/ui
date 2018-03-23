<template>
    <div class="friends">
        <bit-header/>
        <div class="container">
            <navigation/>
            <friend-open/>
            <div class="content">
                <h1 class="title">
                    My friends
                </h1>

                <ul class="friends-list">
                    <li v-for="friend in getFriends"
                        @click="openFriend(friend)">
                        {{friend.username}}
                    </li>
                </ul>

                <hr/>

                <h2>Search</h2>
                <input v-model="search"/>

                <ul class="friends-list">
                    <li v-for="result in searchResults">
                        <div v-if="result.result === 'exist'">
                            <span class="icon-add" @click="addFriend(result.idurl)"></span>
                            <div>
                                <p>{{result.nickname}}</p>
                                <p>{{result.idurl}}</p>
                            </div>
                        </div>
                        <div v-if="result.result === 'not exist'">
                            <span class="icon-invite">invite</span>
                            <div>
                                <p>{{result.nickname}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
                <hr/>

                <h2>
                    Messages
                </h2>
                <pre>
                    {{getMessages}}
                </pre>


                {{addFriendResponse}}

            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import api from '../services/api';
    import navigation from '@/components/Navigation';
    import bitHeader from '@/components/BitHeader';
    import friendOpen from '../components/FriendOpen';

    export default {
        name: 'users',
        data() {
            return {
                search: '',
                searchResults: '',
                addFriendResponse: ''
            };
        },
        components: {
            navigation,
            bitHeader,
            friendOpen
        },
        computed: {
            ...mapGetters([
                'getFriends',
                'getMessages'
            ])
        },
        methods: {
            ...mapActions([
                'getApiFriends',
                'openFriend'
            ]),
            searchUser() {
                api.searchUser(this.search).then(resp => {
                    this.searchResults = resp.result;
                });
            },
            addFriend(id) {
                api.addFriend(id).then(resp => {
                    this.addFriendResponse = resp;
                    this.getApiFriends();
                });
            }
        },
        watch: {
            'search': function (resp) {
                if (resp.length > 3) {
                    this.searchUser();
                }
            }
        },
        created() {
            this.getApiFriends();
        }
    };
</script>

<style lang="scss" scoped>

    @import "../../static/css/variables.scss";

    .friends-list {
        list-style: none;
        display: flex;
        flex-flow: wrap;

        li {
            margin: 10px 0;
            background: $color-white;
            padding: 10px;
            border-radius: 20px;
            margin-right: 10px;
            cursor: pointer;

            &:hover {
                opacity: .6;
            }
        }
    }

    hr {
        margin: 10px 0;
    }

    .icon-add {
        cursor: pointer;
        margin-right: 15px;
        background-position: center;
        background-size: 24px;
        float: left;
        width: 30px;
        height: 30px;
        &:hover {
            opacity: .6
        }
    }
</style>
