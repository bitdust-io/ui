<template>
    <div class="tabs">
        <ul>
            <li v-for="(component, index) in components"
                :key="index"
                @click="setCurrentComponent(component)"
                :class="{'active' : component.name === currentComponent.name }">
                {{component.name}}
            </li>
        </ul>

        <component :is="currentComponent"
                   class="component"/>
    </div>
</template>

<script>
    export default {
        name: 'Tabs',
        props: {
            components: {
                type: Array
            }
        },
        data() {
            return {
                currentComponent: undefined
            };
        },
        methods: {
            setCurrentComponent(component) {
                this.currentComponent = component;
            }
        },
        created() {
            this.currentComponent = this.components[0];
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    ul {
        display: flex;

        li {
            list-style: none;
            cursor: pointer;
            padding: 10px;
            margin-right: 10px;
            font-size: .9rem;

            &.active {
                color: $color-white;
                background: $color-blue-4;
            }
        }
    }

    .component {
        margin-top: 50px;
        margin-bottom: 200px;
    }
</style>
