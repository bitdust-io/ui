<template>
    <div class="friend">
        <div class="container">
            <friend-chat/>
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
                        <li v-for="(friend, index) in getFriends"
                            :key="index"
                            @click="openFriend(friend)"
                            :class="{'online' : friend.contact_status === 'online'}">

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

                    <label for="search"
                           class="search">
                        Search by name:
                    </label>

                    <input v-model="search"
                           id="search"/>

                    <button class="ui-button primary"
                            @click="searchUser">Search
                    </button>

                    <div v-if="addFriendResponse"
                         class="add-friend-response">
                        <span @click="addFriendResponse = null"
                              class="close">X</span>
                        {{addFriendResponse.result[0]}}
                    </div>

                    <ul class="friends-list">
                        <li v-for="result in searchResults"
                            :key="result.nickname">
                            <div v-if="result.result === 'exist'">
                                <span class="icon-add" @click="addFriend(result.idurl)"></span>
                                <div>
                                    <p>{{result.nickname}}</p>
                                    <p>{{result.idurl}}</p>
                                </div>
                            </div>
                            <div v-if="result.result === 'not exist'">
                                <h4>
                                    No results for
                                </h4>
                                <p>{{result.nickname}}</p>
                            </div>
                        </li>
                    </ul>

                    <div v-if="observeSearchAlias.length > 1">
                        <h2>Other results</h2>
                        <ul class="friends-list">
                            <li v-for="result in searchResults"
                                :key="result.nickname">
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
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import api from '../services/api';
    import FriendChat from '../components/Friend/FriendChat';
    import friendMessageCounter from '../components/Friend/FriendMessagesCounter';
    import userFirstLetter from '../components/Globals/UserFirstLetter';

    export default {
        name: 'Friend',
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
            FriendChat,
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
                });
            },
            addFriend(id) {
                api.addFriend(id).then(resp => {
                    this.addFriendResponse = resp;
                    this.getApiFriends();
                });
            }
        },
        created() {
            this.getApiFriends();
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/includes.scss";

    .add-friend-response {
        font-size: .8em;
        margin: 25px 0;
        padding: 15px;
        background: $color-blue-2;
        display: block;

        .close {
            background: $color-white;
            padding: 5px 10px;
            cursor: pointer;
            margin-right: 10px;
            &:hover {
                opacity: 0.6;
            }
        }
    }

    .search {
        font-size: .9rem;
    }

    .ui-button {
        font-size: 1rem;
        padding: 10px 15px;
        vertical-align: top;
    }

    input {
        border: 1px solid $color-gray-2;
        background: $color-white;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 4px;
        padding: 6px;
        font-size: .8rem;

        &::placeholder {
            color: $color-gray-2;
        }
    }

    .friends-list {
        margin-top: 30px;
        position: relative;
        list-style: none;
        display: flex;
        flex-flow: wrap;

        li {
            position: relative;
            margin: 10px 10px 0 0;
            min-width: 260px;
            background: $color-white;
            padding: 10px 10px 10px 30px;
            cursor: pointer;
            display: flex;
            text-transform: capitalize;
            font-size: 1.2rem;
            line-height: 2.4rem;

            &:hover {
                opacity: .6;
            }
        }
    }

    .icon-add {
        cursor: pointer;
        margin-right: 15px;
        float: left;
        width: 30px;
        height: 30px;
        background: url("../assets/icons/icon-add.svg") center no-repeat;
        background-size: 24px;

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

    .online {
        position: relative;

        &:before {
            left: 10px;
            top: 24px;
            position: absolute;
            content: '';
            width: 12px;
            height: 12px;
            background: $color-green;
            border-radius: 100%;
        }
    }
</style>
