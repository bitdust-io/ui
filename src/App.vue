<template>
    <div id="app">
        <BitHeader/>
        <router-view/>
    </div>
</template>

<script>
    import BitHeader from '@/components/Globals/BitHeader';

    export default {
        name: 'App',
        components: {
            BitHeader
        }
    };
</script>
