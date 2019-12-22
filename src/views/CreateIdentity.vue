<template>
    <div>
        <h3>Create identity</h3>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';

    const applicationModule = namespace('applicationStore');
    @Component
    export default class Loading extends Vue {
        @applicationModule.Getter connectionStatus!: any;
        @applicationModule.Getter getIdentity!: any;

        @Watch('connectionStatus')
        onPropertyChanged(value: any) {
            // if (value.status === 'OK') this.$router.push('/chat');
        }
    }
</script>
