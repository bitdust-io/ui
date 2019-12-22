<template>
    <div class="loading">
        <div class="wave-fill">
            <div class="water">
                <span class="wave"/>
                <span class="deep-water"/>
            </div>
        </div>
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
        onConnectionStatus(value: any) {
            if (value === 'OK') this.$router.push('/chat');
        }

        @Watch('getIdentity')
        onGetIdentity(value: string) {
            if (value === 'ERROR') this.$router.push('/create-identity');
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/config";

    #app, html, body {
        height: 100%;
    }

    .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        flex-direction: column;
        color: $color-gray-20;
    }

    .wave-fill {
        height: 180px;
        width: 180px;
        background-image: linear-gradient(-120deg, $color-blue-1 0%, $color-purple 100%);
        -webkit-mask-image: url('../assets/images/logo-pictogram-white.png');
        -webkit-mask-size: contain;
    }

    span {
        display: block;
        width: 100%;
    }

    .wave {
        background: url("../assets/images/wave.png");
        height: 22px;
        background-size: contain;
        animation: wave 10s linear infinite;
    }

    .deep-water {
        background: $color-white;
        height: 200px;
    }

    @keyframes wave {
        from {
            background-position: 0px 0px;
        }
        to {
            background-position: 1000px 0px;
        }
    }

    .water {
        animation: water 10s ease;
    }

    @keyframes water {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(-10%);
        }
    }

</style>
