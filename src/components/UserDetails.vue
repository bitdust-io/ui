<template>
    <div class="hello">
        <h1>{{ user }}</h1>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';
    import {IdentityResultInterface} from '@/types/apiTypes';

    const applicationModule = namespace('application');

    @Component
    export default class HelloWorld extends Vue {
        @applicationModule.State user!: IdentityResultInterface;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
