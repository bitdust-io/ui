<template>
    <div id="wrapper">
        <main>
            <div class="left-side">
        <span class="title">
          BitDust - home
        </span>
            </div>

            <div class="right-side">

                {{fileList}}

                <div class="doc">
                    <div class="title">Getting Started</div>
                    {{main}}
                    <button @click="increment()">Increment
                    </button>

                    <button @click="decrement()">Decrement
                    </button>

                    <button @click="getFiles()">get files
                    </button>

                    <button @click="goStart()">go start
                    </button>
                </div>
                <div class="doc">
                    <div class="title alt">Other Documentation</div>
                    <button class="alt" @click="open('https://electron.atom.io/docs/')">Electron</button>
                    <button class="alt" @click="open('https://vuejs.org/v2/guide/')">Vue.js</button>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import store from '../store/';
    import Api from '../services/api';

    export default {
        name: 'home-page',
        components: {},
        data() {
            return {
                fileList: {}
            };
        },
        computed: {
            main() {
                return store.state['Counter'].main;
            }
        },
        methods: {
            goStart() {
                this.$router.push('/');
            },
            open(link) {
                this.$electron.shell.openExternal(link);
            },
            increment() {
                store.commit('INCREMENT_MAIN_COUNTER', 1);
            },
            decrement() {
                store.commit('DECREMENT_MAIN_COUNTER', 1);
            },
            getFiles() {
                Api.listFiles()
                    .then(res => {
                        this.fileList = res;
                    });
            }
        },
        beforeCreate: function () {
        }
    };
</script>

<style>

</style>
