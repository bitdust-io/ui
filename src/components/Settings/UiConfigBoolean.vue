<template>
    <div>
        {{item.key}}
        <ui-switch
            v-model="settings[item.key]"
            @input="onChange(item)"
            :input-value="item.value === 'true'"
            :name="item.key"
            v-if="item.type === 'boolean'"
        />
        <div class="info">
            <p class="label" v-if="item.type !== 'boolean' && item.value">{{item.value}}</p>
            <p class="label" v-if="item.label">
                {{item.label}}
            </p>
            <p class="label" v-if="item.info">
                {{item.info}}
            </p>
        </div>
    </div>
</template>

<script>
    import UiSwitch from '@/components/Globals/UiSwitch';

    export default {
        name: 'UiConfigBoolean',
        data() {
            return {
                settings: {}
            };
        },
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        components: {
            UiSwitch
        },
        methods: {
            onChange(data) {
                let config = {
                    value: this.settings[data.key],
                    key: data.key
                };
                this.$emit('onChange', config);
            }
        }
    };
</script>

<style lang="scss" scoped>
    @import "@/assets/scss/includes.scss";

    .info {
        display: flex;

        .label {
            padding: 5px 10px;
            display: block;
            background: $color-gray-4;
            border-radius: 10px;
            flex: 1;
            margin: 6px 10px;
            word-wrap: break-word;
            width: 100%;

            &:first-child {
                flex: .5;
                margin-left: 0;
            }

            &:last-child {
                flex: 3;
            }

        }
    }
</style>
