<template>
    <div class="customers">
        My Customers

        <pre v-if="customers && customers.length > 0">
            {{customers}}
        </pre>
        <h3 v-else>
            You have no customers yet.
        </h3>

    </div>
</template>

<script>
    import Api from '../services/api';

    export default {
        name: 'customers',
        data() {
            return {
                customers: []
            };
        },
        created() {
            Api.getCustomers().then(data => {
                this.customers = data.result;
            });
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .customers {
        margin: 40px 0;
        background: $color-blue-2;
        padding: 20px;
    }

    h3 {
        font-size: .8rem;
    }


</style>
