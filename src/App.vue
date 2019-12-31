<template>
    <div id="app">
        <router-view v-if="identity.global_id"/>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {IdentityResultInterface} from '@/types/apiTypes';
    import {namespace} from 'vuex-class';

    const applicationModule = namespace('applicationStore');

    @Component
    export default class App extends Vue {
        @applicationModule.State identity!: IdentityResultInterface;
    }
</script>
