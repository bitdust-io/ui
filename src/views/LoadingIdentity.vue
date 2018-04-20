<template>
    <div>
        <h1>
            Loading your identity...
        </h1>

    </div>
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
        },
        created() {
        }
    };
</script>

