<template>
    <div class="avatar">{{userFirstLetter}}</div>
</template>

<script>
    export default {
        props: ['name'],
        computed: {
            userFirstLetter() {
                if (!this.name) return;
                return this.name.substring(0, 1);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #440044;
        text-transform: uppercase;
        color: $color-white;
        text-align: center;
        line-height: 40px;
        font-size: 1.4rem;
        margin-right: 10px;
    }
</style>
