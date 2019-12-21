<template>
    <div>
        <FriendsList/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import UserDetails from '@/components/UserDetails.vue';
    import FriendsList from '@/components/FriendsList.vue';

    @Component({
        components: {
            FriendsList,
            UserDetails
        }
    })
    export default class Chat extends Vue {
    }
</script>
