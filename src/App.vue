<template>
    <div id="app">
        <bit-header/>
        <router-view/>
        <ui-modal/>
    </div>
</template>

<script>
    import BitHeader from '@/components/Globals/BitHeader';
    import UiModal from '@/components/Globals/UiModal';

    export default {
        name: 'App',
        components: {
            BitHeader,
            UiModal
        }
    };
</script>
