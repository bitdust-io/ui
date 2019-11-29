<template>
    <div class="default-padding container">
        <div class="loading">
            <div class="logo-wrapper">
                <icon name="logo" class="logo"/>
                <icon name="loading"
                      class="rotating"
                      size="xl"/>
            </div>
            <h1 class="title primary has-text-primary">Connecting</h1>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
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
