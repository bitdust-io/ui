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

    export default {
        name: 'loading',
        data() {
            return {
                error: false
            };
        },
        computed: {
            isLoaded() {
                return store.state['Application'].isLoaded;
            }
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
            'isLoaded': function (response) {
                if (response) {
                    setTimeout(() => {
                        Api.getIdentity().then(resp => {
                            if (resp.status === 'OK') {
                                this.$router.push('home');
                            } else {
                                this.$router.push('create-identity');
                            }
                        });
                    }, 1000);
                } else {
                    this.error = true;
                }
            }
        }
    };
</script>

