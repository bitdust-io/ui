<template>
    <div class="loading intro-background">
        <div class="logo-wrapper">
            <icon name="logo" class="logo"/>
            <icon name="loading"
                  class="rotating"
                  size="xl"/>
        </div>
        <h1>You are being connected</h1>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Api from '../services/api';
    import Icon from '@/components/Icon/Icon';

    export default {
        name: 'Loading',
        computed: {
            ...mapGetters([
                'connectionStatus'
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
            connectionStatus(response) {
                if (response.status !== 'OK') {
                    if (response.reason === 'identity_not_exist') {
                        this.$router.push('/create-identity');
                    }
                } else {
                    Api.getIdentity().then(response => {
                        if (response.status === 'OK') {
                            this.updateIdentity(response.result[0]);
                            this.$router.push('/files');
                        } else {
                            this.$router.push('/create-identity');
                        }
                    }).catch(err => {
                        console.log(err);
                    });
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "../assets/scss/_colors.scss";
    @import "../assets/scss/includes.scss";

    .loading {
        height: 100%;
        margin-top: 40px;
    }

    .logo-wrapper {
        margin: 40px auto;
        position: relative;
        width: 140px;
        height: 260px;
        display: block;
    }

    .rotating {
        animation: rotating 2s linear infinite;
        position: absolute;
        fill: $color-blue-1;
    }

    .logo {
        left: 26px;
        position: absolute;
        width: 140px;
        border: 8px solid $color-white;
        border-radius: 100%;
        padding-top: 25px;
        text-align: center;
        fill: $color-blue-1;
    }

    @keyframes rotating {
        to {
            transform: rotate(360deg);
        }
    }

    h1 {
        text-align: center;
        display: block;
        color: $color-blue-1;
        @include metric;
        font-size: 5rem;
    }
</style>
