<template>
    <label>
        <input
            v-model="modelValue"
            :name="name"
        >
        <button @click="onChange()"
                class="button primary is-small">save
        </button>
    </label>
</template>

<script>
    export default {
        name: 'UiInput',
        created() {
            this.modelValue = this.inputValue;
        },
        props: {
            inputValue: {
                type: String,
                required: true
            },
            name: {
                type: [String],
                required: true
            }
        },
        methods: {
            onChange() {
                this.$emit('input', this.modelValue);
            }
        }
    };
</script>
<style lang="scss" scoped>
    @import "../../assets/scss/includes.scss";

    label {
        display: flex;
        margin: 10px 0;
    }

    input {
        padding: 4px;
        margin-right: 10px;
        min-width: 200px;

        @include breakpoint-up(sm) {
            min-width: 300px;
        }
    }

</style>
