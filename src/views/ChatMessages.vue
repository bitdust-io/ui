<template>

    <div>
        <nav class="buttons pd-10">
            <b-button rounded
                      to="/chat"
                      tag="router-link"
                      icon-left="chevron-left"/>

            <div class="is-flex first-letter">
                <FirstLetter :name="$route.params.id"
                             size="30"
                             class="first-letter"/>

                <p v-if="friendDetails">
                    {{ friendDetails.alias }}
                </p>
            </div>
            <b-button rounded
                      icon-left="cog"/>
        </nav>

        <UiMessages :friend="friendDetails"/>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import UserDetails from '@/components/UserDetails.vue';
    import {namespace} from 'vuex-class';
    import {FriendInterface} from '@/types/chatTypes';
    import FirstLetter from '@/components/FirstLetter.vue';
    import UiMessages from '@/components/UiMessages.vue';

    const chatModule = namespace('chatStore');
    @Component({
        components: {UiMessages, FirstLetter, UserDetails}
    })
    export default class ChatMessages extends Vue {
        @Prop() private friend!: string;

        @chatModule.State friends!: FriendInterface[];
        @chatModule.State messages!: FriendInterface[];

        get friendDetails() {
            return this.friends.find(f => f.global_id === this.$route.params.id);
        }
    }
</script>

<style lang="scss" scoped>
    .buttons {
        justify-content: space-between;
    }

    .first-letter {
        align-items: center;
    }
</style>
