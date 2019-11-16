<template>
    <div>
        <notifications/>
        <header :class="{'visible': visible}">
            <div class="logo">
                <img src="../../assets/logo/bitdust-logo-white.svg"/>
            </div>

            <div id="nav"
                 class="menu">
                <router-link v-for="(item, index) in items"
                             :key="index"
                             :to="item.path"
                             exact-active-class="active"
                             :class="{'active': childActive(item.path)}">
                    <font-awesome-icon :icon="item.icon"/>
                    {{ item.name }}
                </router-link>
            </div>

            <div class="header-right">
                <files-monitor/>
                <user-identity/>
                <div class="connection-status"
                     :class="connectionStatus.status">
                </div>
            </div>
        </header>
        <bubbles v-if="!visible"/>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import UserIdentity from './UserIdentity';
    import Bubbles from '@/components/Globals/Bubbles';
    import FilesMonitor from '@/components/Globals/FilesMonitor';
    import Notifications from './Notifications';

    const icons = {
        files: 'folder-open',
        friend: 'users',
        settings: 'cogs'
    };

    export default {
        name: 'BitHeader',
        data() {
            return {
                visible: false
            };
        },
        created() {
            this.items = [];
            this.$router.options.routes.forEach(route => {
                if (this.isVisible(route.name)) {
                    this.items.push({
                        name: route.name,
                        path: route.path,
                        icon: icons[route.name]
                    });
                }
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
                let visibleRouters = [
                    'files',
                    'friend',
                    'settings',
                    'setting'
                ];
                return visibleRouters.indexOf(name) > -1;
            }
        },
        components: {
            UserIdentity,
            Bubbles,
            Notifications,
            FilesMonitor
        },
        watch: {
            '$route'(to) {
                this.visible = this.isVisible(to.name);
            }
        }
    };
</script>

<style lang="scss" scoped>

    @import "../../assets/scss/colors";
    @import "../../assets/scss/mixins";

    header {
        height: 100px;
        display: flex;
        justify-content: space-between;
        background-image: linear-gradient(-120deg, $color-blue-1 0%, $color-purple-1 100%);
        align-items: center;
        margin-top: -100px;
        transition: margin-top .3s ease;

        &.visible {
            margin-top: 0;
        }

        .logo {
            display: none;

            @include breakpoint-up(sm) {
                display: block;
            }

            img {
                width: 140px;
                margin-left: 40px;
            }
        }

        .header-right {
            @include breakpoint-up(sm){
                display: flex;
                margin-left: auto;
                align-items: center;
                margin-right: 15px;
            }
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

    .menu {
        padding: 5px;
        display: flex;

        a {
            cursor: pointer;
            text-align: center;
            font-size: 1rem;
            color: $color-white;
            text-decoration: none;
            padding: 5px;
            margin: 2px 10px;
            text-transform: uppercase;
            position: relative;
            z-index: 1;
            transition: all .2s ease-in-out;

            &.active {
                color: $color-gray-3;
                transform: translateY(5px);

                &:after {
                    z-index: -1;
                    content: '';
                    position: absolute;
                    bottom: -20px;
                    top: -20px;
                    opacity: .1;
                    left: -10px;
                    right: -10px;
                    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%);
                }
            }

            svg {
                display: block;
                margin: 10px auto;
            }
        }

        @include breakpoint-up(sm) {
            margin-left: 100px;

            a {
                margin: 2px 20px;
            }
        }
    }
</style>
