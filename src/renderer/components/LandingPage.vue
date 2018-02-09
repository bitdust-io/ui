<template>
    <div id="wrapper">
        <main>
            BitDust is Loading...
        </main>
    </div>
</template>

<script>
    import store from '../store/';
    // import runBash from '../../../node/bash';

    export default {
        name: 'landing-page',
        data() {
            return {};
        },
        computed: {
            isLoaded() {
                return store.state['Application'].isLoaded;
            }
        },
        methods: {
            shellCallback(error, stdout, stderr) {
                if (error) {
                    console.error(error);
                }
                if (stderr) {
                    console.error(stderr);
                }
                console.log('re');
                store.commit('UPDATE_IS_LOADED', true);
            }
        },
        beforeCreate: function () {
        },
        created() {
            // console.log('re');
            // runBash(this.shellCallback);
        },
        watch: {
            'isLoaded': function (id) {
                if (id) {
                    console.log(id);
                    // this.$router.push('home');
                }
            }
        }
    };
</script>

<style lang="scss">
    @import '../../../static/css/styles.scss';
</style>
