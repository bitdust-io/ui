<template>
    <div class="settings page">
        <bit-header/>
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

                <h2 class="events-title">Events - total ({{getEvents.length}})</h2>
                <ul class="event-list">
                    <li v-for="event in getEvents">
                        {{event.status}}
                        <div v-for="item in event.result">
                            {{item.id}}
                            {{item.time | date}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '@/services/api';
    import navigation from '@/components/Navigation';
    import bitHeader from '@/components/BitHeader';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';

    export default {
        name: 'users',
        data() {
            return {
                localPath: '',
                downloadPath: ''
            };
        },
        components: {
            navigation,
            bitHeader
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
            }
        },
        computed: {
            ...mapGetters([
                'getEvents'
            ])
        },
        created() {
            this.getPath();
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


    .ui-input {
        border: 1px solid $color-gray-2;

        &::placeholder {
            color: $color-gray-2;
        }
    }

    ul {
        list-style: none;
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

    .events-title {
        margin-top: 50px;
        font-size: .8rem;
    }

    .event-list {
        font-size: .8rem;
        height: 200px;
        overflow: auto;
    }
</style>
