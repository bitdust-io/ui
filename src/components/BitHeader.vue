<template>
    <header v-if="visible">
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
        name: 'Header',
        data() {
            return {
                visible: false
            };
        },
        mounted() {
            this.visible = this.isVisible(this.$router.currentRoute.name);
        },
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        },
        methods: {
            isVisible(name) {
                let visibleRouters = [
                    'home',
                    'users',
                    'settings'
                ];
                return visibleRouters.indexOf(name) > -1;
            }
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
