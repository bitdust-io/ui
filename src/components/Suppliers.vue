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
                <span @click="replaceSupplier(supplier)"
                      class="replace-supplier">replace</span>
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
        methods: {
            replaceSupplier(supplier) {
                Api.replaceSupplier(supplier).then(resp => {
                    this.getSuppliers();
                });
            },
            getSuppliers() {
                Api.getSuppliers().then(data => {
                    this.suppliers = data.result;
                });
            }
        },
        created() {
            this.getSuppliers();
        },
        components: {
            Icon
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .replace-supplier {
        padding: 4px;
        color: $color-white;
        margin-left: 20px;
        cursor: pointer;
        font-size: .8rem;
        background: $color-red;
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
