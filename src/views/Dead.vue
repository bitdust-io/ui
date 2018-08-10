<template>
    <section class="page">
        <article>
            <div class="dead">
                <div class="loading-wrapper">
                    <img src="../assets/images/loading.svg"
                         class="loading"/>
                </div>
                <h1>
                    Ooops, something went wrong.
                </h1>
                <h2>Trying to re-connect</h2>
            </div>
        </article>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'dead',
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

<style scoped lang="scss">
    .page {
        justify-content: flex-start;
        align-items: center;
        text-align: center;

        article {
            margin-top: 7.7rem;
            line-height: 4rem;
        }

        .page-subtitle {
            text-align: center;
            margin-top: 1rem;
        }
    }
</style>
