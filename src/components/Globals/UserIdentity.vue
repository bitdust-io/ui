<template>
    <div class="user-identity"
         :class="{active: getIdentity.name}">
        <user-first-letter :name="getIdentity.name"/>
        <div class="user-name">{{getIdentity.name}}</div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import userFirstLetter from './UserFirstLetter';

    export default {
        components: {userFirstLetter},
        computed: {
            ...mapGetters([
                'getIdentity'
            ])
        },
        methods: {
            ...mapActions([
                'updateIdentity'
            ])
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/colors";

    .user-identity {
        display: flex;
        align-items: center;
        transform: scale(.1);
        transition: all .2s ease;
        opacity: 0;

        &.active {
            transform: none;
            opacity: 1;
        }
    }

    .user-name {
        text-transform: capitalize;
        color: $color-white;
    }
</style>
