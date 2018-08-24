<template>
    <i class="root"
       :class="size"
       v-html="require(`!svg-inline-loader!../../../assets/images/icons/${icon}.svg`)"
       v-on="$listeners"/>
</template>

<script>
    export default {
        name: 'icon',
        data: () => ({
            icon: '',
            prefix: 'icon-'
        }),
        props: {
            name: {
                type: String,
                required: true
            },
            size: {
                type: String,
                default: 'md'
            }
        },
        created() {
            this.icon = this.prefix + this.name;
        }
    };
</script>

<style lang="scss" scoped>
    .root {
        box-sizing: content-box;
        display: inline-block;
        font-size: 0;
    }

    .xs {
        height: calc(0.3125rem * 2);
        width: calc(0.3125rem * 2);
    }

    .sm {
        height: calc(0.425rem * 2);
        width: calc(0.425rem * 2);
    }

    .md {
        height: calc(0.5rem * 2);
        width: calc(0.5rem * 2);
    }

    .lg {
        height: calc(0.575rem * 2);
        width: calc(0.575rem * 2);
    }

    .xl {
        height: calc(0.625rem * 2);
        width: calc(0.625rem * 2);
    }

    .xxl {
        height: calc(0.825rem * 2);
        width: calc(0.825rem * 2);
    }

    .xxxl {
        height: calc(1rem * 2);
        width: calc(1rem * 2);
    }
</style>
