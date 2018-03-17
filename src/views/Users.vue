<template>
    <div>
        <bit-header/>
        <div class="container">
            <navigation/>
            <div class="content">
                <h1 class="title">
                    My friends
                </h1>
                <ul>
                    <li v-for="friend in friends">
                        {{friend}}
                    </li>
                </ul>

                <hr/>

                <h2>Search</h2>
                <input v-model="search"/>
                <button @click="searchUser">go!</button>

                <ul class="user-list">
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

                {{addFriendResponse}}

            </div>
        </div>
    </div>
</template>

<script>
    import api from '../services/api';
    import navigation from '@/components/Navigation';
    import bitHeader from '@/components/BitHeader';

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
            bitHeader
        },
        computed: {
            friends() {
                return api.userList();
            }
        },
        methods: {
            searchUser() {
                api.searchUser(this.search).then(resp => {
                    this.searchResults = resp.result;
                });
            },
            addFriend(id) {
                api.addFriend(id).then(resp => {
                    this.addFriendResponse = resp;
                });
            }
        }
    };
</script>

<style lang="scss">
    .user-list {
        list-style: none;
        display: flex;

        li {
            margin: 10px 0;
            > div {
                display: flex;
                align-items: center;
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
