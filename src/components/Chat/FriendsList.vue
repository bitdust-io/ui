<template>
    <section class="panel">

        <p class="panel-tabs">
            <UserDetails/>
        </p>

        <a class="panel-block">
            <p class="control has-icons-left">
                <span class="icon is-right">
                </span>
                <input class="input"
                       placeholder="Search"
                       v-model="search">
                <span class="icon is-left">
                    <font-awesome-icon icon="search"/>
                </span>
            </p>
        </a>

        <router-link class="panel-block"
                     v-for="friend in friendsResult"
                     :key="friend.global_id"
                     :to="{name:'chat-messages', params:{id:friend.global_id}}">
            <span class="panel-icon">
                <FirstLetter :name="friend.global_id" size="18"/>
            </span>
            {{friend.username}}
        </router-link>

        <div v-if="triggerSearch">
            No friends founded
        </div>

    </section>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import UserDetails from '@/components/Global/UserDetails.vue';
    import {namespace} from 'vuex-class';
    import {FriendInterface} from '@/types/chatTypes';
    import FirstLetter from '@/components/Global/FirstLetter.vue';

    const chatModule = namespace('chatStore');
    @Component({
        components: {FirstLetter, UserDetails}
    })
    export default class FriendsList extends Vue {
        search = '';

        @Prop() private msg!: string;

        @chatModule.Action getFriends: any;
        @chatModule.State friends!: FriendInterface[];

        created() {
            this.getFriends();
        }

        searchUser() {
            // TODO Call search useer
        }

        get friendsResult() {
            return this.friends.filter((f) => {
                return f.username.toString()
                    .toLowerCase()
                    .indexOf(this.search.toLowerCase()) >= 0;
            });
        }

        get triggerSearch() {
            if (this.friendsResult.length === 0 && this.search) {
                this.searchUser();
                return true;
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
