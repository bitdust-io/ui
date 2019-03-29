<template>
    <grid-content>
        <div slot="menu">

            <ul class="link-list">
                <li>
                    <router-link
                        :to="'/settings/services'"
                        class="link"
                        active-class="active"
                    >
                        Services
                    </router-link>
                </li>

                <li v-for="item in getConfigKeys"
                    :key="item">
                    <router-link
                        :to="'/settings/'+item"
                        class="link"
                        active-class="active"
                    >
                        {{item}}
                    </router-link>
                </li>
                <li>
                    <button @click="backupKey" class="button slim is-small">Backup key</button>
                </li>
            </ul>
        </div>

        <div slot="main">
            <ul class="settings-list"
                v-if="this.currentKey !=='services'">
                <li v-for="(item, index) in getConfigForKey(currentKey)"
                    :key="index">

                    <config-item :item="item"
                                 @onChange="onChange" />
                </li>
            </ul>
            <ul v-else
                class="settings-list"
            >
                <li v-for="(item, index) in Settings.serviceList"
                    :key="index">
                    {{item.name.replace('service_', '')}}

                    <config-item :item="getServiceConfigForKey(item.name)"
                                 v-if="getServiceConfigForKey(item.name)"
                                 @onChange="onChange" />

                    <ul>
                        <li v-for="(subItem, index) in item.depends"
                            :key="index">

                            <div>
                                {{subItem.replace('service_', '')}}
                            </div>

                            <config-item :item="getServiceConfigForKey(subItem)"
                                         v-if="getServiceConfigForKey(subItem)"
                                         @onChange="onChange" />

                            <div v-if="getServiceByKey(subItem)"
                                 class="status">
                                <div>
                                    <span>State</span>
                                    <span>{{getServiceByKey(subItem).state}}</span>
                                </div>
                                <div>
                                    <span>Installed</span>
                                    <span>{{getServiceByKey(subItem).installed}}</span>
                                </div>
                                <div>
                                    <span>Enabled</span>
                                    <span>{{getServiceByKey(subItem).enabled}}</span>
                                </div>
                            </div>
                        </li>

                    </ul>
                </li>

            </ul>
        </div>
    </grid-content>
</template>

<script>
    import Api from '../services/api';
    import {mapActions, mapState, mapGetters} from 'vuex';
    import ConfigItem from '../components/Globals/ConfigItem';
    import GridContent from '../components/Globals/GridContent';

    export default {
        name: 'Settings',
        data() {
            return {
                currentKey: undefined,
                settings: {}
            };
        },
        components: {
            ConfigItem,
            GridContent
        },
        computed: {
            ...mapState(['Settings']),
            ...mapGetters([
                'getConfigKeys',
                'getConfigForKey',
                'getServiceByKey',
                'getServiceConfigForKey',
                'connectionStatus'
            ])
        },
        created() {
            this.updateConfigList();
            this.updateServiceList();
            this.currentKey = 'services';
        },
        methods: {
            ...mapActions([
                'updateConfigList',
                'updateServiceList'
            ]),
            backupKey() {
                Api.identityBackup();
            },
            onChange(config) {
                Api.setConfig(config);
            }
        },
        watch: {
            '$route'(to) {
                this.currentKey = to.params.id;
            },
            getConfigKeys(data) {
                if (data.indexOf(this.$route.params.id) === -1) {
                    this.$router.push('/settings/services');
                } else {
                    this.currentKey = this.$route.params.id;
                }
            },
            connectionStatus(response) {
                if (response.status === 'OK') this.updateServiceList();
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/includes.scss";

    .settings-list {
        padding: 60px 0 20px;
        max-width: 800px;

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

    .status {
        background: #ebebeb;
        padding: 10px;
        border-radius: 8px;
        display: flex;

        div {
            display: flex;
            margin: 10px;
            border: 1px solid $color-gray-2;
        }

        span {
            padding: 2px 8px;
            background: white;
            background: $color-gray-1;
            color: $color-white;

            &:first-child {
                background: $color-gray-4;
                color: $color-gray-1;
                padding-right: 14px;
                padding-left: 6px;
            }
        }
    }

</style>
