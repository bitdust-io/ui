<template>
    <div id="app"
         class="page">
        <bit-header/>
        <router-view/>
    </div>
</template>

<script>
    import bitHeader from '@/components/BitHeader';

    export default {
        name: 'bitdust-web',
        components: {
            bitHeader
        }
    };
</script>
