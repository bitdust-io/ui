<template>
    <div class="suppliers">


        <ul v-if="suppliers && suppliers.length > 0">
            <li v-for="(supplier, index) in suppliers"
                :key="index">
                <icon name="internet"
                      class="icon"
                      size="xxl"
                      :class="supplier.contact_status"/>
                <p>{{supplier.global_id}}</p>
            </li>
        </ul>

        <h3 v-else>
            You have no suppliers yet.
        </h3>

    </div>
</template>

<script>
    import Api from '../services/api';
    import Icon from './Generic/Icon/Icon';

    export default {
        name: 'Suppliers',
        data() {
            return {
                suppliers: []
            };
        },
        created() {
            Api.getSuppliers().then(data => {
                this.suppliers = data.result;
            });
        },
        components: {
            Icon
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .suppliers {
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
            color: $color-red;

            &.online {
                color: $color-green;
            }
        }
    }


</style>
