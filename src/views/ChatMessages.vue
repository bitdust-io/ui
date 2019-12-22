<template>
    <div>
        <UiMessages v-if="friendDetails" :friend="friendDetails" :identity="identity" :messages="messages"/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import UserDetails from '@/components/Global/UserDetails.vue';
    import {namespace} from 'vuex-class';
    import {FriendInterface} from '@/types/chatTypes';
    import FirstLetter from '@/components/Global/FirstLetter.vue';
    import UiMessages from '@/components/Chat/UiMessages.vue';
    import {IdentityResultInterface} from '@/types/apiTypes';

    const chatModule = namespace('chatStore');
    const applicationModule = namespace('applicationStore');
    @Component({
        components: {UiMessages, FirstLetter, UserDetails}
    })
    export default class ChatMessages extends Vue {
        @applicationModule.State identity!: IdentityResultInterface;
        @chatModule.State friends!: FriendInterface[];
        @chatModule.State messages!: FriendInterface[];

        get friendDetails(): FriendInterface | {} {
            return this.friends.find(f => f.global_id === this.$route.params.id) || {};
        }
    }
</script>

<style lang="scss" scoped>

</style>
