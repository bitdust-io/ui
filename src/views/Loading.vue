<template>
    <div class="loading">
        <h1>Bitdust is loading</h1>
        {{ connectionStatus }}
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Api from '../services/api';

    export default {
        name: 'Loading',
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        },
        methods: {
            ...mapActions([
                'updateIdentity'
            ]),
            goToPath(path) {
                this.$router.push(path);
            }
        },
        watch: {
            connectionStatus(response) {
                if (response.status !== 'OK') {
                    if (response.reason === 'identity_not_exist') {
                        this.goToPath('create-identity');
                    }
                } else {
                    Api.getIdentity().then(response => {
                        if (response.status === 'OK') {
                            this.updateIdentity(response.result[0]);
                            this.goToPath('files');
                        } else {
                            this.goToPath('create-identity');
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
        }
    };
</script>
