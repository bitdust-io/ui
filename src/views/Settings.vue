<template>
    <div>
        <bit-header/>
        <div class="container">
            <navigation/>
            <div class="content">
                <h1 class="title">
                    Settings
                </h1>
                <ul>
                    <li>Set 01</li>
                    <li>Set 02</li>
                    <li>Set 03</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import navigation from '@/components/Navigation';
    import bitHeader from '@/components/BitHeader';

    export default {
        name: 'users',
        components: {
            navigation,
            bitHeader
        }
    };
</script>

<style scoped>
    ul {
        list-style: none;
    }
</style>
