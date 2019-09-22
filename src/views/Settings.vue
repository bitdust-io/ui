<template>
    <grid-content>
        <div slot="main">
            <div v-if="currentKey ==='suppliers'">
                <suppliers/>
            </div>
            <ul class="settings-list"
                v-if="currentKey !=='services'">
                <li v-for="(item, index) in getConfigForKey(currentKey)"
                    class="main"
                    :key="index">

                    <ui-config :item="item"
                               @onChange="onChange"/>
                </li>
            </ul>
            <ul v-else
                class="settings-list"
            >
                <li v-for="(item, index) in Settings.serviceList"
                    :key="index"
                    class="main">
                    <h2>
                        {{item.name.replace(/service_|_/g, ' ')}}
                    </h2>

                    <ui-status :status="item"/>

                    <div v-for="config in item.configs"
                         :key="config.key"
                         class="config">

                        <ui-config :item="config"
                                   @onChange="onChange"/>
                    </div>

                    <div class="depends-on">
                        <h3>Depends on</h3>

                        <ul class="depends">
                            <li v-for="(subItem, index) in item.depends"
                                :key="index">
                                <div>
                                    {{subItem.replace('service_', '')}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>

            </ul>
        </div>

        <div slot="menu">

            <ul class="link-list">
                <li>
                    <router-link :to="'/settings/suppliers'"
                                 class="link"
                                 active-class="active"
                    >
                        Suppliers
                    </router-link>
                </li>
                <li>
                    <router-link :to="'/settings/services'"
                                 class="link"
                                 active-class="active"
                    >
                        Services
                    </router-link>
                </li>

                <li v-for="item in getConfigKeys"
                    :key="item">
                    <router-link :to="'/settings/'+item"
                                 class="link"
                                 active-class="active"
                    >
                        {{item}}
                    </router-link>
                </li>
                <li>
                    <button @click="backupKey"
                            class="button slim is-small">Backup key
                    </button>
                </li>
            </ul>

            <p v-if="isDownload"
               class="download">
                Your key was saved on:
                {{ isDownload }}
            </p>
        </div>
    </grid-content>
</template>

<script>
    import Api from '../services/api';
    import {mapActions, mapState, mapGetters} from 'vuex';
    import UiConfig from '../components/Settings/UiConfig';
    import UiStatus from '../components/Settings/UiStatus';
    import Suppliers from '../components/Settings/Suppliers';
    import GridContent from '../components/Globals/GridContent';

    export default {
        name: 'Settings',
        data() {
            return {
                currentKey: undefined,
                settings: {},
                isDownload: false
            };
        },
        components: {
            UiConfig,
            UiStatus,
            GridContent,
            Suppliers
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
            this.updateLists();
            this.currentKey = 'services';
        },
        methods: {
            ...mapActions([
                'updateConfigList',
                'updateServiceList'
            ]),
            async backupKey() {
                Api.identityBackup();
                const {result} = await Api.getPath();
                this.isDownload = result[0].value;
            },
            onChange(config) {
                Api.setConfig(config);
                this.updateLists();
            },
            updateLists() {
                this.updateConfigList();
                this.updateServiceList();
            }
        },
        watch: {
            '$route'(to) {
                to.params.id ? this.currentKey = to.params.id : this.$router.push('/settings/services');
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

        }

        .main {
            font-size: .9rem;
            border-radius: 10px;
            padding: 20px;

            h2 {
                font-size: 1rem;
                text-transform: capitalize;
                margin: 10px 0;
                font-weight: bold;
            }

            &:hover {
                box-shadow: 0 0 30px -10px rgba(0, 0, 0, .6);
            }

            &.active {
                color: $color-white;
                background: $color-purple-1;
            }

            .depends-on {
                display: flex;
                align-items: center;
                border: 1px solid $color-gray-2;
                padding: 10px;
                border-radius: 10px;

                h3 {
                    font-size: .8rem;
                    font-weight: 700;
                    margin-right: 10px;
                    color: $color-purple-1;
                }

                .depends {
                    display: flex;

                    li {
                        padding: 10px;
                        margin-right: 10px;
                    }
                }
            }

            .config {
                border: 1px solid $color-gray-2;
                border-radius: 10px;
                margin: 10px 0;
                padding: 10px;

                /deep/ .label {
                    margin: 5px;
                }
            }
        }
    }

    .download {
        font-size: .9rem;
        color: $color-red;
        margin-top: 10px;
    }

</style>
