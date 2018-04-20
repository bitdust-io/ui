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
    import {mapGetters, mapActions} from 'vuex';

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
            ...mapActions([
                'updateIdentity'
            ])
        },
        watch: {
            'connectionStatus': function (response) {
                if (response.status !== 'OK') {
                    if (response.reason === 'identity_not_exist') {
                        this.$router.push('create-identity');
                    }
                } else {
                    Api.getIdentity().then(resp => {
                        if (resp.status === 'OK') {
                            this.updateIdentity(resp.result[0]);
                            this.$router.push('home');
                        } else {
                            this.$router.push('create-identity');
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
        }
    };
</script>


<style scoped lang="scss">

</style>
