<template>
    <section class="bg-wave section-loading">
        <article>
            <header v-if="!error">
                <h1 class="page-title">
                    We are connecting you
                </h1>
                <h2 class="page-subtitle">
                    One moment...
                </h2>
            </header>
            <header v-if="error">
                <h1 class="page-title">
                    We are connecting you
                </h1>
                <h2 class="sub-title">
                    Ooops, something went wrong, can you please restart Bitdust
                </h2>
            </header>
        </article>
    </section>
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

.section-loading {
    justify-content: flex-start;

    article {
        margin-top: 7.7rem;
    }

    .page-subtitle {
        text-align: center;
        margin-top: 1rem;
    }

}
</style>
