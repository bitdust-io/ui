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
    import Api from '../services/api';
    import {mapGetters} from 'vuex';

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
        watch: {
            'connectionStatus': function (response) {
                console.log(response);
                if (response.status === 'ERROR') return;
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

