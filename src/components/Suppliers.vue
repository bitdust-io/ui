<template>
    <div class="suppliers">
        My Suppliers

        <pre v-if="suppliers.length > 0">
            {{suppliers}}
        </pre>
        <h3 v-else>
            You have no suppliers yet.
        </h3>

    </div>
</template>

<script>
    import Api from '../services/api';

    export default {
        name: 'suppliers',
        data() {
            return {
                suppliers: []
            };
        },
        created() {
            Api.getSuppliers().then(data => {
                this.suppliers = data.result;
            });
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .suppliers {
        margin: 40px 0;
        background: $color-blue-2;
        padding: 20px;
    }

    h3 {
        font-size: .8rem;
    }


</style>
