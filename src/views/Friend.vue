<template>
    <grid-content>
        <div slot="menu">

            <div class="buttons">
                <b-button @click="openSearch"
                          size="is-medium"
                          rounded
                          type="is-primary">
                    <font-awesome-icon icon="search"/>
                    Search friends
                </b-button>
            </div>

            <ul class="link-list">
                <li v-for="(friend, index) in getFriends"
                    :key="index"
                    :class="{'online': friend.contact_state !== 'OFFLINE'}">
                    <router-link class="link"
                                 active-class="active"
                                 :to="{ name: 'friend', params: { id: friend.username }}">
                        {{friend.username}}
                    </router-link>
                </li>
            </ul>

            <p class="info">
                <font-awesome-icon icon="info-circle"/>
                You can only send messages to a friend that is online.
            </p>

        </div>

        <div slot="main">

            <friend-chat :current-friend="getCurrentFriend"
                         v-if="getCurrentFriend"/>
            <div v-else>
                Select a friend to chat !
            </div>

            <div class="search"
                 v-if="isSearchOpen">

                <div class="inner-container">

                    <span class="close-main"
                          @click="closeSearch">
                        <font-awesome-icon icon="times"/>
                    </span>

                    <label for="search">
                        Search friends
                    </label>

                    <div class="input-wrapper">
                        <input v-model="search"
                               ref="searchInput"
                               v-on:keydown.enter="searchUser"
                               placeholder="Type your friend name"
                               id="search"/>

                        <button :class="{'is-loading': isLoading}"
                                :disabled="this.search.length < 3 || isLoading"
                                class="button primary search-user"
                                @click="searchUser">
                            <font-awesome-icon v-if="isLoading"
                                               icon="spinner"
                                               class="loading rotating"/>
                            <span>Search</span>
                        </button>
                    </div>

                    <div v-if="addFriendResponse"
                         class="add-friend-response">

                        <span @click="addFriendResponse = null">
                            <font-awesome-icon icon="times"/>
                        </span>

                        {{addFriendResponse.result[0]}}
                    </div>

                    <ul class="friends-list">
                        <li v-for="result in searchResults"
                            :key="result.nickname">
                            <div v-if="result.result === 'exist'">
                                <div class="item"
                                     @click="addFriend(result.idurl)">
                                    <font-awesome-icon icon="user-plus"
                                                       class="icon"/>
                                    <p>{{result.nickname}}</p>
                                </div>
                            </div>
                            <div v-if="result.result === 'not exist'">
                                <h4>
                                    No results for: {{result.nickname}}
                                </h4>
                            </div>
                        </li>
                    </ul>

                    <div v-if="observeSearchAlias.length > 1">
                        <h2>Other results</h2>
                        <ul class="friends-list">
                            <li v-for="result in searchResults"
                                :key="result.nickname">

                                <div class="item"
                                     @click="addFriend(result.idurl)">
                                    <font-awesome-icon icon="user-plus"
                                                       class="icon"/>
                                    <p>{{result.nickname}}</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    </grid-content>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import api from '../services/api';
    import FriendChat from '../components/Friend/FriendChat';
    import GridContent from '../components/Globals/GridContent';

    export default {
        name: 'Friend',
        data() {
            return {
                isSearchOpen: false,
                search: '',
                searchResults: [],
                observeSearchAlias: [],
                addFriendResponse: '',
                isLoading: false
            };
        },
        components: {
            FriendChat,
            GridContent
        },
        computed: {
            ...mapGetters([
                'getFriends',
                'getLastFriend',
                'connectionStatus'
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
                this.$nextTick(() => {
                    this.$refs.searchInput.focus();
                });
            },
            closeSearch() {
                this.isSearchOpen = false;
                this.search = '';
                this.observeSearchAlias = [];
                this.searchResults = [];
                this.addFriendResponse = '';
            },
            async searchUser() {
                if (this.search.length < 3) return;
                this.isLoading = true;
                try {
                    const {result} = await api.searchUser(this.search);
                    this.searchResults = result;
                    if (result[0].result === 'exist') {
                        this.observeSearchResult(result[0].nickname);
                    } else {
                        this.observeSearchAlias = [];
                    }
                } catch (e) {
                    console.log('Error searching', e);
                }
                this.isLoading = false;
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
            document.getElementsByTagName('html')[0].classList.remove('intro-background');
        },
        watch: {
            connectionStatus() {
                this.getApiFriends();
            },
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

    .link-list {
        .online {
            background: greenyellow;
        }
    }

    .search {
        z-index: 10;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, .95);
        padding: 20px;

        @include breakpoint-up(sm) {
            padding: 50px;
        }

        .inner-container {
            position: relative;
        }

        .close-main {
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
            font-size: 2rem;

            &:hover {
                color: $color-purple-1;
            }
        }

        label {
            font-size: 1.6rem;
            display: block;
            font-weight: bold;
        }

        .input-wrapper {

            margin-top: 20px;

            input {
                min-width: 300px;
                padding: 8px;
                font-size: 1rem;
            }

            .search-user {
                margin-left: 10px;
                padding: 2px 20px;
                outline: none;
                position: relative;
                transition: padding .2s ease;

                &.is-loading {
                    background: $color-gray-1;
                    padding: 2px 20px 2px 36px;
                }

                .loading {
                    position: absolute;
                    left: 13px;
                    top: 13px;
                }
            }
        }

    }

    .friends-list {
        margin-top: 30px;
        position: relative;
        list-style: none;
        display: flex;
        flex-flow: wrap;

        li {

            .item {
                display: flex;
                align-items: center;
                cursor: pointer;

                &:hover {
                    color: $color-purple-1;
                }

                .icon {
                    margin-right: 10px;
                }
            }

            a {
                margin: 10px 10px 0 0;
                min-width: 260px;
                padding: 5px 10px 5px 30px;
                cursor: pointer;
                display: flex;
                text-transform: capitalize;
                font-size: 1.2rem;
                line-height: 2.4rem;
                text-decoration: none;

                .online & {
                    color: $color-green;
                }

                &:hover {
                    opacity: .6;
                }
            }
        }
    }

    .add-friend-response {
        font-size: 1rem;
        display: flex;
        align-items: center;

        span {
            margin-right: 10px;
            cursor: pointer;
            font-size: 1.4rem;
        }
    }

    .info {
        font-size: .8rem;
        margin-top: 20px;
        background: $color-gray-4;
        padding: 10px;

    }

</style>
