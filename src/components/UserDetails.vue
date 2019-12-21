<template>
    <div class="is-flex mg-10">
        <h1>{{ user.value }}</h1>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';
    import {IdentityInterface, IdentityResultInterface} from '@/types/apiTypes';

    const applicationModule = namespace('applicationStore');

    @Component
    export default class UserDetails extends Vue {
        @applicationModule.State user!: IdentityResultInterface;
        @applicationModule.State identity!: IdentityInterface;
    }
</script>

<style lang="scss" scoped>
</style>
