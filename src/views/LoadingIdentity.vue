<template>
    <section class="bg-wave section-loading">
        <article>
            <div class="loading-wrapper">
                <img src="../assets/images/loading.svg"
                     class="loading"/>
            </div>
            <h1 class="page-title">
                Loading your identity
            </h1>
            <h2 class="page-subtitle">
                one moment please
            </h2>
        </article>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'loading-identity',
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        },
        watch: {
            'connectionStatus': function (response) {
                if (response.status === 'OK') {
                    this.$router.push('home');
                }
            }
        }
    };
</script>

<style lang="scss" scoped>

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

