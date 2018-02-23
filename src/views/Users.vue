<template>
    <div>
        <bit-header/>
        <div class="container">
            <navigation/>
            <div class="content">
                <h1 class="title">
                    Users list
                </h1>
                <ul>
                    <li>user 01</li>
                    <li>user 02</li>
                    <li>user 03</li>
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

<style>
    ul {
        list-style: none;
    }
</style>
