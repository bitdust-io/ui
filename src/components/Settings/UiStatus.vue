<template>
    <div class="status">
        <div>
            <span>State</span>
            <span :class="status.state">{{status.state}}</span>
        </div>
        <div>
            <span>Installed</span>
            <span :class="{'active': status.installed}">{{status.installed}}</span>
        </div>
        <div>
            <span>Enabled</span>
            <span :class="{'active': status.enabled}">{{status.enabled}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ConfigItem',
        data() {
            return {
                settings: {}
            };
        },
        props: {
            status: {
                type: Object,
                required: true
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/includes.scss";

    .status {
        background: #ebebeb;
        padding: 10px;
        border-radius: 8px;
        display: flex;

        .active {
            background: $color-blue-1;
        }

        .ON {
            background: $color-green;
        }

        .OFF {
            background: $color-red;
        }

        div {
            display: flex;
            margin: 10px;
            border: 1px solid $color-gray-2;
        }

        span {
            padding: 2px 8px;
            background: white;
            background: $color-gray-1;
            color: $color-white;

            &:first-child {
                background: $color-gray-4;
                color: $color-gray-1;
                padding-right: 14px;
                padding-left: 6px;
            }
        }
    }

</style>
