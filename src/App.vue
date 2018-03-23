<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    import application from './services/application';

    export default {
        name: 'bitdust-web',
        created() {
            application.keepConnection();
            application.eventsListen();
            application.messagesListen();
        }
    };
</script>

<style lang="scss">
    @import "../static/css/variables";
    @import "../static/css/icons";
    @import "../static/css/styles";
</style>
