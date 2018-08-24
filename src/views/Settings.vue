<template>
    <div class="settings">
        <div class="container">
            <navigation/>
            <div class="content">

                <h1 class="title">
                    SETTINGS
                </h1>

                <h2 class="local-path">Local path: {{localPath}}</h2>

                <h2 class="local-path">
                    Set new path <input v-model="downloadPath"
                                        class="ui-input"/>
                    <button @click="setDownloadPath"
                            class="btn btn-primary">ok
                    </button>
                </h2>

                <button @click="restartProcess"
                        class="btn btn-primary">Restart
                </button>

                <Tabs :components="components"
                      class="tabs"/>

            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/services/api';
    import navigation from '@/components/Navigation';
    import suppliers from '@/components/Suppliers';
    import customers from '@/components/Customers';
    import donated from '@/components/Donated';
    import keys from '@/components/Keys';
    import events from '@/components/Events';
    import Vue from 'vue';
    import Tabs from './Tabs';

    export default {
        name: 'Settings',
        data() {
            return {
                localPath: '',
                downloadPath: '',
                currentComponent: undefined
            };
        },
        components: {
            navigation,
            Tabs
        },
        methods: {
            setDownloadPath() {
                api.setPath(this.downloadPath).then(resp => {
                    if (resp.status !== 'OK') return;
                    this.getPath();
                });
            },
            getPath() {
                api.getPath().then(resp => {
                    this.localPath = resp.result[0].value;
                });
            },
            restartProcess() {
                api.restartProcess();
            }
        },
        created() {
            this.getPath();

            this.components = [
                keys,
                suppliers,
                customers,
                donated,
                events
            ];
        }
    };

    Vue.filter('date', function (value) {
        if (value) {
            return new Date(value * 1000);
        }
    });
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .settings {
        height: 100%;
    }

    .ui-input {
        border: 1px solid $color-gray-2;

        &::placeholder {
            color: $color-gray-2;
        }
    }

    .tabs {
        margin-top: 50px;
    }

    .title {
        font-weight: normal;
        padding: 10px 0;
        cursor: pointer;
        display: inline-block;
        font-size: 1.4rem;
    }

    .local-path {
        font-size: 1rem;
        margin: 10px 0;
    }

</style>
