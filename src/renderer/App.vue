<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'bitdust-web',
        methods: {
            re() {
                console.log('re');
            }
        }
    };
</script>

<style lang="scss">
    @import "../../static/css/styles";
</style>
