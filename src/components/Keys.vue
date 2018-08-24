<template>
    <div class="keys">

        <ul v-if="keys && keys.length > 0">
            <li v-for="(key, index) in keys" :key="index">
                <icon name="lock"
                      class="icon"
                      size="xl"/>
                {{key.alias}}
            </li>
        </ul>

        <h3 v-else>
            You have no keys yet.
        </h3>

    </div>
</template>

<script>
    import Api from '../services/api';
    import Icon from './Generic/Icon/Icon';

    export default {
        name: 'Keys',
        data() {
            return {
                keys: []
            };
        },
        created() {
            Api.getKeys().then(data => {
                this.keys = data.result;
            });
        },
        components: {
            Icon
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .keys {
    }

    ul {
        list-style: none;

        li {
            padding: 10px;
            margin: 10px 0;
            background: $color-gray-4;
            font-size: .9rem;
            display: flex;
            align-items: center;
        }

        .icon {
            margin-right: 15px;
        }
    }

</style>
