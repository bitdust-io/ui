<template>
    <div id="app">
        <BitHeader/>
        <router-view/>
        <Bubbles/>
    </div>
</template>

<script>
    import BitHeader from '@/components/Globals/BitHeader';
    import Bubbles from '@/components/Globals/Bubbles';

    export default {
        name: 'App',
        components: {
            BitHeader,
            Bubbles
        }
    };
</script>
