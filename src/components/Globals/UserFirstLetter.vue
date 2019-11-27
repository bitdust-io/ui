<template>
    <div class="avatar"
         :style="{'background-color': color()}">
        {{userFirstLetter}}
    </div>
</template>

<script>
    import ColorHash from 'color-hash';

    export default {
        props: ['name'],
        methods: {
            color() {
                let colorHash = new ColorHash({saturation: 0.7});
                return colorHash.hex(this.name);
            }
        },
        computed: {
            userFirstLetter() {
                if (!this.name) return;
                return this.name.substring(0, 1);
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/config";

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #440044;
        text-transform: uppercase;
        color: $color-white;
        text-align: center;
        line-height: 38px;
        font-size: 1.4rem;
        margin-right: 10px;
        transition: all .2s ease-in-out;

        &:hover {
            border-radius: 0;
        }
    }
</style>
