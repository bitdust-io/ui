<template>
    <div class="loading-identity default-padding">
        <div class="loading">
            <div class="logo-wrapper">
                <icon name="logo" class="logo"/>
                <icon name="loading"
                      class="rotating"
                      size="xl"/>
            </div>
            <h1 class="title primary has-text-primary">
                Creating user</h1>
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
                'connectionStatus'
            ])
        },
        methods: {
            ...mapActions(['updateUserFromApi'])
        },
        components: {
            Icon
        },
        watch: {
            connectionStatus(response) {
                if (response.status === 'OK') {
                    this.updateUserFromApi();
                    this.$router.push('/onboarding');
                }
            }
        }
    };
</script>
