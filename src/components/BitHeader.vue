<template>
    <header>
        <h1>Bitdust</h1>
        <div>
            {{connectionStatus}}
            {{getLastEvent}}
            User Status
        </div>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'connectionStatus',
                'getLastEvent'
            ])
        }
    };
</script>

<style scoped lang="scss">
    header {
        background: #ccc;
        height: 100px;
        display: flex;

        h1 {
            flex: 1;
        }
    }
</style>
