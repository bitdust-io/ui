<template>
    <div class="about">
        <h1>Dead</h1>
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
