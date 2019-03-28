<template>
    <div class="settings">

        <div class="menu">
            <ul class="link-list">
                <router-link v-for="item in getKeys"
                             :key="item"
                             :to="'/settings/'+item"
                             class="link"
                             active-class="active"
                >
                    {{item}}
                </router-link>
                <li>
                    <button @click="backupKey" class="button slim is-small">Backup key</button>
                </li>
            </ul>
        </div>
        <div class="main">

            <ul class="settings-list">
                <li v-for="(item, index) in getPropertyForKey(currentKey)"
                    :key="index">
                    {{item.key}}
                    <ui-switch
                        v-model="settings[item.key]"
                        @input="onChange(item)"
                        :input-value="item.value === 'true'"
                        :name="item.key"
                        v-if="item.type === 'boolean'"
                    />
                    <div class="info">
                        <p class="label" v-if="item.type !== 'boolean' && item.value">{{item.value}}</p>
                        <p class="label" v-if="item.label">
                            {{item.label}}
                        </p>
                        <p class="label" v-if="item.info">
                            {{item.info}}
                        </p>
                    </div>
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
                currentKey: undefined,
                settings: {}
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
            onChange(data) {
                let config = {
                    value: this.settings[data.key],
                    key: data.key
                };
                Api.setConfig(config);
            }
        },
        watch: {
            '$route'(to) {
                this.currentKey = to.params.id;
            },
            getKeys(data) {
                if (data.indexOf(this.$route.params.id) === -1) {
                    this.$router.push('/settings/' + data[0]);
                } else {
                    this.currentKey = this.$route.params.id;
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

    @import "../assets/scss/includes.scss";

    .settings {
        display: flex;
        justify-content: space-between;
        height: calc(100% - 100px);
        padding-top: 40px;
    }

    .menu {
        width: 250px;

        .link-list {
            padding: 20px;
            list-style: none;
        }

        .link {
            cursor: pointer;
            text-transform: uppercase;
            display: block;
            text-decoration: none;
            color: $color-purple-1;
            font-size: 1rem;
            padding: 10px;
            transition: all .3s ease;
            border: 0;
            margin: 10px 0;

            &.active {
                border-left: 4px solid $color-purple-1;
            }

            &:hover {
                opacity: .8;
            }
        }
    }

    .settings-list {
        padding: 20px;
        max-width: 800px;

        .info {
            display: flex;

            .label {
                padding: 5px 10px;
                display: block;
                background: $color-gray-4;
                border-radius: 10px;
                flex: 1;
                margin: 6px 10px;
                word-wrap: break-word;
                width: 100%;

                &:first-child {
                    flex: .5;
                    margin-left: 0;
                }

                &:last-child {
                    flex: 3;
                }

            }
        }

        li {
            border: 1px solid $color-gray-4;
            margin: 10px 0;
            display: block;
            list-style: none;
            padding: 20px;
            font-size: .9rem;
            border-radius: 10px;

            &:hover {
                box-shadow: 0 0 30px -10px rgba(0, 0, 0, .6);
            }

            &.active {
                color: $color-white;
                background: $color-purple-1;
            }
        }
    }

    .main {
        flex: 1;
        height: 100%;
        overflow: scroll;
        padding-bottom: 200px;
    }

</style>
