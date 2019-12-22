<template>
    <FriendsList/>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import UserDetails from '@/components/Global/UserDetails.vue';
    import FriendsList from '@/components/Chat/FriendsList.vue';

    @Component({
        components: {
            FriendsList,
            UserDetails
        }
    })
    export default class Chat extends Vue {
    }
</script>
