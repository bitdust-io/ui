<template>
    <section class="bg-wave section-loading">
        <article>
            <header>
                <div class="loading-wrapper">
                    <img src="../assets/images/loading.svg"
                         class="loading"/>
                </div>
                <h1 class="page-title">
                    Connecting you
                </h1>
                <h2 class="page-subtitle">
                    one moment please
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

    .loading {
        text-align: center;
        margin: auto;
    }

    .section-loading {
        justify-content: flex-start;
        align-items: center;

        article {
            margin-top: 7.7rem;
        }

        .page-subtitle {
            text-align: center;
            margin-top: 1rem;
        }

    }
</style>
