<template>

    <div class="container">
        <div class="menu">
            <slot name="menu"/>
        </div>
        <div class="main"
             ref="main"
             id="main">
            <slot name="main"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GridContent'
    };
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/includes.scss";

    .container {
        width: 100%;
        padding: 0 20px;

        @include breakpoint-up(sm) {
            display: flex;
            justify-content: space-between;
            height: calc(100% - 100px);
        }
    }

    .main {
        flex: 1;
        height: 100%;
        overflow-y: auto;
        padding-bottom: 100px;

        &.chat {
            height: calc(100% - 80px);
            padding-bottom: 20px;
        }

        @include breakpoint-up(sm) {
            margin-left: 40px;
            padding-top: 60px;
        }
    }

    .menu {
        margin: 20px 0 0 0;

        @include breakpoint-up(sm) {
            width: 210px;
            margin: 60px 0 0 40px;
        }

        .link-list {
            list-style: none;
            display: inline-block;
            width: 100%;
        }

        .link {
            cursor: pointer;
            text-transform: uppercase;
            display: block;
            text-decoration: none;
            color: $color-purple-1;
            font-size: 1rem;
            padding: 10px;
            transition: all .3s ease;
            border: 0;
            margin: 10px 0;

            &.active {
                border-left: 4px solid $color-purple-1;
            }

            &:hover {
                opacity: .8;
                color: $color-gray-1;
            }
        }
    }

    .menu-title {
        font-size: 1rem;
        color: $color-gray-1;
        text-transform: uppercase;
        margin-bottom: 30px;
    }

</style>
