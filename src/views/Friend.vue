<template>
    <div class="friend">
        <div class="menu">

            <h2 @click="openSearch">
                Search other users
            </h2>

            <ul class="friends-list">
                <li v-for="(friend, index) in getFriends"
                    :key="index"
                    :class="{'online': friend.contact_state === 'CONNECTED'}">
                    <router-link
                        :to="{ name: 'friend', params: { id: friend.username }}">
                        {{friend.username}}
                    </router-link>
                </li>
            </ul>

        </div>

        <div class="main">

            <friend-chat :current-friend="getCurrentFriend"
                         v-if="getCurrentFriend"/>
            <div v-else>
                Please select a friend to chat !
            </div>

            <div class="search" v-if="isSearchOpen">

                <label for="search">
                    Search by name:
                </label>

                <input v-model="search"
                       id="search"/>

                <button class="button primary"
                        @click="searchUser">Search
                </button>

                <button class="button slim"
                        @click="closeSearch">Close
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
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import api from '../services/api';
    import FriendChat from '../components/Friend/FriendChat';

    export default {
        name: 'Friend',
        data() {
            return {
                activeTab: 'myFriends',
                isSearchOpen: false,
                search: '',
                searchResults: '',
                observeSearchAlias: [],
                addFriendResponse: ''
            };
        },
        components: {
            FriendChat
        },
        computed: {
            ...mapGetters([
                'getFriends',
                'getLastFriend'
            ]),
            getCurrentFriend() {
                return this.getFriends.find(friend => friend.username === this.$route.params.id);
            }
        },
        methods: {
            ...mapActions([
                'getApiFriends',
                'updateLastFriend'
            ]),
            openSearch() {
                this.isSearchOpen = true;
            },
            closeSearch() {
                this.isSearchOpen = false;
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
            if (!this.getCurrentFriend && this.getLastFriend) {
                this.$router.push({name: 'friend', params: {id: this.getLastFriend.username}});
            }
        },
        watch: {
            getCurrentFriend(friend) {
                if (friend) {
                    this.updateLastFriend(friend);
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/includes.scss";

    .friend {
        display: flex;
        justify-content: space-between;
        height: calc(100% - 100px);
        overflow: hidden;
    }

    .menu {
        width: 300px;
    }

    .main {
        flex: 1;
    }

    .search {
        z-index: 10;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, .9);
        padding: 50px;

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

            &.online a {
                color: $color-green;
            }

            &:hover {
                opacity: .6;
            }
        }
    }

</style>
