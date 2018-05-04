<template>
    <div class="friends">
        <bit-header/>
        <div class="container">
            <navigation/>
            <friend-details/>
            <div class="content">
                <h1 class="title">
                    My friends
                </h1>

                <!--{{getFriends}}-->

                <ul class="friends-list">
                    <li v-for="friend in getFriends"
                        @click="openFriend(friend)">

                        {{friend.username}}

                        <friend-message-counter v-bind:friend="friend"/>

                        <div v-if="friend.unread"
                             class="messages">
                            {{friend.messages.length}}
                        </div>

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

                            {{addFriendResponse}}
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


                <div v-if="observeSearchAlias.length > 1">
                    <h2>Other results</h2>
                    <ul class="friends-list">
                        <li v-for="result in searchResults">
                            <span class="icon-add" @click="addFriend(result.idurl)"></span>
                            <div>
                                <p>{{result.nickname}}</p>
                                <p>{{result.idurl}}</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import api from '../services/api';
    import navigation from '@/components/Navigation';
    import bitHeader from '@/components/BitHeader';
    import friendDetails from '../components/FriendDetails';
    import friendMessageCounter from '../components/FriendMessagesCounter';

    export default {
        name: 'users',
        data() {
            return {
                search: '',
                searchResults: '',
                observeSearchAlias: [],
                addFriendResponse: ''
            };
        },
        components: {
            navigation,
            bitHeader,
            friendDetails,
            friendMessageCounter
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
                    if (resp.result[0].result === 'exist') {
                        this.observeSearchResult(resp.result[0].nickname);
                    } else {
                        this.observeSearchAlias = [];
                    }
                });
            },
            observeSearchResult(id) {
                api.observeUser(id).then(data => {
                        this.observeSearchAlias = data.result;
                    }
                );
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

    @import "../../src/assets/scss/colors";

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
