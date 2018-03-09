<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import Application from './services/application';

    export default {
        name: 'bitdust-web',
        created() {
            Application.keepConnection();
            Application.eventsListen();
        }
    };
</script>

<style lang="scss">
    @import "../static/css/variables";
    @import "../static/css/icons";
    @import "../static/css/styles";
</style>
