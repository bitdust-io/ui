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
                'healthStatus'
            ])
        },
        watch: {
            'healthStatus': function (response) {
                if (response.status === 'OK') {
                    this.$router.push('loading');
                }
            }
        }
    };
</script>
