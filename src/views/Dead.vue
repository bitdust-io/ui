<template>
    <div class="inner-container">

        <h1>Dead</h1>

        <p class="is-hidden-tablet">
            If you're running BitDust on Android device, please ensure that you're also running the BitDust CORE APP.
            You can download it here: <a
                href="https://github.com/bitdust-io/android/releases/download/alpha/bitdust-service.apk">Download</a>
        </p>

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
    @import "~buefy/src/scss/buefy-build";

    .inner-container {
        margin-top: 50px;

        h1 {
            font-size: 3rem;
        }
    }
</style>
