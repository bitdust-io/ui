<template>

    <div>
        <ul>
            {{messages}}
        </ul>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';

    const chatModule = namespace('chatStore');
    @Component
    export default class ChatMessages extends Vue {
        @Prop() private friend!: string;

        @chatModule.State messages!: any;
    }
</script>

<style lang="scss" scoped>
    .buttons {
        justify-content: space-between;
    }

    .first-letter {
        align-items: center;
    }
</style>
