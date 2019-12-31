<template>
    <div class="is-flex mg-20" v-if="user.value">
        <FirstLetter :name="user.value"
                     size="20"
                     class="first-letter"/>
        <h1>{{ user.value }}</h1>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';
    import {IdentityInterface, IdentityResultInterface} from '@/types/apiTypes';
    import FirstLetter from '@/components/Global/FirstLetter.vue';

    const applicationModule = namespace('applicationStore');
    @Component({
        components: {FirstLetter}
    })
    export default class UserDetails extends Vue {
        @applicationModule.State user!: IdentityResultInterface;
        @applicationModule.State identity!: IdentityInterface;
    }
</script>

<style lang="scss" scoped>
</style>
