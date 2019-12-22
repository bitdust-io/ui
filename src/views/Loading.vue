<template>
    <div>
        <h3>loading</h3>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';

    const applicationModule = namespace('applicationStore');
    @Component
    export default class Loading extends Vue {
        @applicationModule.State connectionStatus!: any;
        @applicationModule.State getIdentity!: any;

        @Watch('connectionStatus')
        onConnectionStatus(value: any) {
            if (value === 'OK') this.$router.push('/chat');
        }

        @Watch('getIdentity')
        onGetIdentity(value: string) {
            if (value === 'ERROR') this.$router.push('/create-identity');
        }
    }
</script>
