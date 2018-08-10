<template>
    <header>
        <div class="header-right">
            <notifications/>
            <user-identity/>
            <div class="connection-status" :class="connectionStatus.status">
            </div>
        </div>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex';
    import UserIdentity from './UserIdentity';
    import Notifications from './Notifications';

    export default {
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        },
        components: {
            UserIdentity,
            Notifications
        }
    };
</script>

<style lang="scss" scoped>

    @import "../../src/assets/scss/colors";

    header {
        height: 100px;
        display: flex;
        justify-content: space-between;

        .header-right {
            display: flex;
            margin-left: auto;
            align-items: center;
            margin-right: 15px;
        }

        .connection-status {
            width: 20px;
            height: 20px;
            border: 1px solid $color-white;
            border-radius: 50%;
            margin-left: 10px;
        }

        .OK {
            background: $color-green;
        }
        .ERROR {
            background: red;
        }
    }
</style>
