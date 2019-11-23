<template>
    <div class="about inner-container">
        <h1>Dead</h1>
        <p>
            If you're running BitDust on Android device, please ensure that you're also running the BitDust CORE APP.
            You can download it here: <a href="https://github.com/bitdust-io/android/releases/tag/alpha">Download</a>
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
    .about {
        margin-top: 50px;
        p {
            margin-top: 70px;
        }
    }
</style>
