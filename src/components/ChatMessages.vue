<template>

    <div>
        <nav class="buttons pd-10">
            <b-button rounded
                      type="is-primary"
                      to="/chat"
                      tag="router-link"
                      icon-left="chevron-left"/>

            <div class="is-flex first-letter">
                <FirstLetter :name="$route.params.id"
                             size="30"
                             class="first-letter"/>

                <p>
                    {{$route.params.id}}
                </p>
            </div>
            <b-button rounded
                      icon-left="cog"/>
        </nav>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import UserDetails from '@/components/UserDetails.vue';
    import {namespace} from 'vuex-class';
    import {FriendInterface} from '@/types/chatTypes';
    import FirstLetter from '@/components/FirstLetter.vue';

    const chatModule = namespace('chatStore');
    @Component({
        components: {FirstLetter, UserDetails}
    })
    export default class ChatMessages extends Vue {
        search = '';

        @Prop() private friend!: string;
        @Prop() private messages!: Array<any>;

        @chatModule.Action getFriends: any;
        @chatModule.State friends!: FriendInterface[];

        get friendsResult() {
            return this.friends.filter((f) => {
                console.log(f);
                return f.alias.toString()
                    .toLowerCase()
                    .indexOf(this.search.toLowerCase()) >= 0;
            });
        }
    }
</script>

<style lang="scss" scoped>
    .buttons {
        justify-content: space-between;
    }
</style>
