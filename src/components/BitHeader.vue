<template>
    <header>
        <h1>bitDust</h1>
        <div>
            <h3>
                User Status: {{connectionStatus}}
            </h3>
        </div>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        }
    };
</script>

<style lang="scss">
    header {
        height: 100px;
        display: flex;
        z-index: 2;

        h1 {
            flex: 1;
            margin: 30px 0 0 50px;
        }
    }
</style>
