<template>
    <div class="dead page">
        <h1>
            Ooops, something went wrong, can you please restart Bitdust
        </h1>
        <h2>Trying to re-connect</h2>
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
                if (response === 'OK') {
                    this.$router.push('home');
                }
            }
        }
    };
</script>
