<template>
    <div class="loading">
        <div class="logo-wrapper">
            <icon name="logo" class="logo" />
            <icon name="loading"
                  class="rotating"
                  size="xl" />
        </div>
        <h1>You are being connected</h1>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Icon from '@/components/Globals/Icon';

    export default {
        name: 'Loading',
        created() {
            document.getElementsByTagName('html')[0].classList.add('intro-background');
        },
        computed: {
            ...mapGetters([
                'connectionStatus',
                'getIdentity'
            ])
        },
        components: {
            Icon
        },
        methods: {
            ...mapActions([
                'updateIdentity'
            ])
        },
        watch: {
            getIdentity(identity) {
                if (identity.status === 'ERROR') this.$router.push('/create-identity');
            },
            connectionStatus(response) {
                if (response.status === 'OK') this.$router.push('/files');
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/includes.scss";

    .logo-wrapper {
        margin: 40px auto;
        position: relative;
        width: 140px;
        height: 260px;
        display: block;
    }

    .logo {
        left: 36px;
        position: absolute;
        width: 140px;
        border-radius: 100%;
        padding-top: 32px;
        text-align: center;
        fill: $color-blue-1;
    }

</style>
