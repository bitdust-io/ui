<template>
    <div class="inner-container">

        <h1>BitDust is trying to re-connect</h1>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'dead',
        computed: {
            ...mapGetters([
                'healthStatus',
                'connectionStatus'
            ])
        },
        watch: {
            healthStatus(response) {
                if (response === 'OK') {
                    this.$router.push('loading');
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .inner-container {
        margin-top: 50px;

        h1 {
            font-size: 3rem;
        }
    }
</style>
