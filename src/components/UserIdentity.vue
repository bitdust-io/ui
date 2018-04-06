<template>
    <div class="user-identity">
        <div class="avatar">{{userFirstLetter}}</div>
        <div class="user-name">{{getIdentity.name}}</div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'getIdentity'
            ]),
            userFirstLetter() {
                return this.getIdentity.name.substring(0, 1);
            }
        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    @import "../../static/css/variables";

    .user-identity {
        display: flex;
        align-items: center;
    }

    .user-name {
        text-transform: capitalize;
    }
    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #440044;
        text-transform: uppercase;
        color: $color-white;
        text-align: center;
        line-height: 50px;
        font-size: 2rem;
        margin-right: 10px;
    }
</style>
