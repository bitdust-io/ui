<template>
    <grid-content>
        <div slot="main">
            {{this.currentKey}}
            <ul class="settings-list"
                v-if="this.currentKey !=='services'">
                <li v-for="(item, index) in getConfigForKey(currentKey)"
                    :key="index">

                    <ui-config-boolean :item="item"
                                       @onChange="onChange" />
                </li>
            </ul>
            <ul v-else
                class="settings-list"
            >
                <li v-for="(item, index) in Settings.serviceList"
                    :key="index">
                    {{item.name.replace('service_', '')}}

                    <ui-config-boolean :item="getServiceConfigForKey(item.name)"
                                       v-if="getServiceConfigForKey(item.name)"
                                       @onChange="onChange" />

                    <ui-status :status="item" />

                    <ul>
                        <li v-for="(subItem, index) in item.depends"
                            :key="index">

                            <div>
                                {{subItem.replace('service_', '')}}
                            </div>

                            <ui-config-boolean :item="getServiceConfigForKey(subItem)"
                                               v-if="getServiceConfigForKey(subItem)"
                                               @onChange="onChange" />

                            <ui-status :status="getServiceByKey(subItem)" />

                        </li>

                    </ul>
                </li>

            </ul>
        </div>

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
    </grid-content>
</template>

<script>
    import Api from '../services/api';
    import {mapActions, mapState, mapGetters} from 'vuex';
    import UiConfigBoolean from '../components/Settings/UiConfigBoolean';
    import UiStatus from '../components/Settings/UiStatus';
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
            UiConfigBoolean,
            UiStatus,
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

</style>
