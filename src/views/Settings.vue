<template>
    <div class="settings">

        <div class="menu">
            <ul>
                <li v-for="item in getKeys"
                    :key="item"
                    @click="setMenuActive(item)">
                    {{item}}
                </li>
                <li>
                    <button @click="backupKey" class="button slim is-small">Backup key</button>
                </li>
            </ul>
        </div>
        <div class="main">
            <ul>
                <li v-for="item in getPropertyForKey(currentKey || getKeys[0])"
                    :key="item">
                    {{item.key}}
                    <ui-switch v-if="item.type === 'boolean'" />
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import Api from '../services/api';
    import {mapActions, mapState, mapGetters} from 'vuex';
    import UiSwitch from '../components/Globals/UiSwitch';

    export default {
        name: 'Settings',
        data() {
            return {
                currentKey: undefined
            };
        },
        components: {
            UiSwitch
        },
        computed: {
            ...mapState(['Settings']),
            ...mapGetters([
                'getKeys',
                'getPropertyForKey'
            ])
        },
        mounted() {
            this.updateSettingsList();
            this.currentKey = this.getKeys[0];
        },
        methods: {
            ...mapActions(['updateSettingsList']),
            backupKey() {
                Api.identityBackup();
            },
            setMenuActive(menu) {
                this.currentKey = menu;
            }
        },
        watch: {
            getPropertyForKey(data) {
                debugger;
            }
        }
    };
</script>

<style lang="scss" scoped>

    @import "../assets/scss/includes.scss";

    .settings {
        display: flex;
        justify-content: space-between;
        height: 100%;
        margin-top: 40px;
    }

    .menu {
        width: 250px;

        li {
            cursor: pointer;
        }
    }

    ul {
        padding: 20px;
        max-width: 400px;

        li {
            list-style: none;
            padding: 10px;
            font-size: .9rem;
            border-radius: 10px;
            text-transform: uppercase;

            &.active {
                color: $color-white;
                background: $color-purple-1;
            }

            svg {
                margin-right: 10px;
            }

            &:hover {
                opacity: .8;
            }
        }
    }

    .main {
        flex: 1;
        max-height: 600px;
        overflow: scroll;
    }
</style>
