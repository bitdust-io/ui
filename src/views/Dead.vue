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
