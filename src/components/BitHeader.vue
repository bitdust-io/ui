<template>
    <header>
        <div class="header-right">
            <user-identity/>
            <div class="connection-status" :class="connectionStatus">
            </div>
        </div>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex';
    import UserIdentity from './UserIdentity';

    export default {
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        },
        components: {
            UserIdentity
        }
    };
</script>

<style lang="scss" scoped>

    @import "../../static/css/variables";

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
