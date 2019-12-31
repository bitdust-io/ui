<template>
    <div>
        <h1>BitDust is trying to reconnect</h1>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';

    const applicationModule = namespace('applicationStore');
    @Component
    export default class Loading extends Vue {
        @applicationModule.Getter connectionStatus!: any;

        @Watch('connectionStatus')
        onPropertyChanged(value: any) {
            if (value === 'OK') this.$router.push('/chat');
        }
    }
</script>
