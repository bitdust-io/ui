<template>
    <div class="settings page">
        <bit-header/>
        <div class="container">
            <navigation/>
            <div class="content">
                <h1 class="title">
                    Settings
                </h1>

                <h2>Local path</h2>
                {{localPath}}
                <h2>
                    Set new path <input v-model="downloadPath"/>
                    <button @click="setDownloadPath">ok</button>
                </h2>

                <h2>Events - {{getEvents.length}}</h2>
                <ul>
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

<style scoped>
    ul {
        list-style: none;
    }
</style>
