<template>
    <header v-if="visible">

        <div id="nav">
            <router-link v-for="(item, index) in items"
                         :key="index"
                         :to="item.path"
                         exact-active-class="active"
                         :class="{'active': childActive(item.path)}">
                {{ item.name }}
            </router-link>

        </div>

        <div class="header-right">
            <user-identity/>
            <div class="connection-status"
                 :class="connectionStatus.status">
            </div>
        </div>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex';
    import UserIdentity from './UserIdentity';

    export default {
        name: 'Header',
        data() {
            return {
                visible: false
            };
        },
        created() {
            this.items = [];
            this.$router.options.routes.forEach(route => {
                this.items.push({
                    name: route.name,
                    path: route.path
                });
            });
        },
        mounted() {
            this.visible = this.isVisible(this.$router.currentRoute.name);
        },
        computed: {
            ...mapGetters([
                'connectionStatus'
            ]),
            childActive() {
                return menu => menu.indexOf(this.$route.name) > -1;
            }
        },
        methods: {
            isVisible(name) {
                // let visibleRouters = [
                //     'files',
                //     'friend',
                //     'settings'
                // ];
                return true;
                // return visibleRouters.indexOf(name) > -1;
            }
        },
        components: {
            UserIdentity
        },
        watch: {
            '$route'(to, from) {
                this.visible = this.isVisible(to.name);
            }
        }
    };
</script>

<style lang="scss" scoped>

    @import "../../assets/scss/colors";

    header {
        height: 100px;
        display: flex;
        justify-content: space-between;
        background-image: linear-gradient(-120deg, $color-blue-1 0%, $color-purple-1 100%);
        align-items: center;

        .header-right {
            display: flex;
            margin-left: auto;
            align-items: center;
            margin-right: 15px;
        }

        .connection-status {
            width: 15px;
            height: 15px;
            margin-left: 14px;
            margin-top: 6px;
            background: $color-white;
            transition: all 1s ease-in-out;
            animation: spin 2s linear infinite;
        }

        .OK {
            background: $color-green;
            border-radius: 50%;
        }
        .ERROR {
            background: red;
        }

        @keyframes spin {
            100% {
                transform: rotate(360deg);
            }
        }

    }

    #nav {
        padding: 5px;

        a {
            font-size: 1rem;
            color: $color-white;
            text-decoration: none;
            padding: 5px;
            margin: 2px;

            &.active {
                color: $color-red;
            }
        }
    }
</style>
