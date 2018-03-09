<template>
    <div>
        <div v-if="!error">
            <h1>
                BitDust is Loading...
            </h1>
        </div>
        <div v-if="error">
            <h1>
                Ooops, something went wrong, can you please restart Bitdust
            </h1>
        </div>
    </div>
</template>

<script>
    import store from '../store/';
    import Api from '../services/api';
    import {mapGetters} from 'vuex';

    let tryReconnect = 0;

    export default {
        name: 'loading',
        data() {
            return {
                error: false
            };
        },
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        },
        methods: {
            shellCallback(error, stdout, stderr) {
                if (error) {
                    console.error(error);
                }
                if (stderr) {
                    console.error(stderr);
                }
                store.commit('UPDATE_IS_LOADED', true);
            }
        },
        watch: {
            'connectionStatus': function (response) {
                Api.getIdentity().then(resp => {
                    if (resp.status === 'OK') {
                        this.$router.push('home');
                    } else {
                        this.$router.push('create-identity');
                    }
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    };
</script>

