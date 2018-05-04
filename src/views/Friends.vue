<template>
    <div class="friends page">
        <bit-header/>
        <div class="container">
            <navigation/>
            <friend-details/>
            <div class="content">

                <ul class="sub-menu">
                    <li :class="{'active': (activeTab ==='myFriends')}"
                        @click="setMenuActive('myFriends')">MY FRIENDS
                    </li>
                    <li class="separator"></li>
                    <li :class="{'active': (activeTab ==='addFriends')}"
                        @click=" setMenuActive('addFriends')">SEARCH OTHER USERS
                    </li>
                </ul>

                <div v-show="this.activeTab === 'myFriends'">
                    <ul class="friends-list">
                        <li v-for="friend in getFriends"
                            @click="openFriend(friend)">

                            <user-first-letter :name="friend.username"/>

                            {{friend.username}}

                            <friend-message-counter v-bind:friend="friend"/>

                            <div v-if="friend.unread"
                                 class="messages">
                                {{friend.messages.length}}
                            </div>

                            <div class="icon-chat"
                                 v-if="currentFriend.global_id === friend.global_id"></div>

                        </li>
                    </ul>
                </div>
                <div v-show="this.activeTab === 'addFriends'">
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
                </div>

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
    import userFirstLetter from '../components/UserFirstLetter';

    export default {
        name: 'friends',
        data() {
            return {
                activeTab: 'myFriends',
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
            friendMessageCounter,
            userFirstLetter
        },
        computed: {
            ...mapGetters([
                'getFriends',
                'getMessages',
                'currentFriend'
            ])
        },
        methods: {
            ...mapActions([
                'getApiFriends',
                'openFriend'
            ]),
            setMenuActive(menu) {
                this.activeTab = menu;
            },
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

    @import "../../static/css/variables.scss";

    .friends-list {
        position: relative;
        list-style: none;
        display: flex;
        flex-flow: wrap;

        li {
            position: relative;
            margin: 10px 10px;
            min-width: 260px;
            background: $color-white;
            padding: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;

            &:hover {
                opacity: .6;
            }
        }
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

    .icon-chat {
        right: 0;
        top: 20px;
        position: absolute;
        opacity: 0.6;
    }
</style>
