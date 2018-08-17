<template>
    <div class="customers">
        Donated
        <pre v-if="donated">
            {{donated}}
        </pre>
        <h3 v-else>
            You have no customers yet.
        </h3>

    </div>
</template>

<script>
    import Api from '../services/api';
    import Vue from 'vue';

    Vue.filter('formatSize', (a, b) => {
        if (a === 0) return '0 Bytes';
        let c = 1024;
        let d = b || 2;
        let e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
    });

    export default {
        name: 'donated',
        data() {
            return {
                donated: {}
            };
        },
        created() {
            Api.getDonated().then(data => {
                this.donated = data.result[0];
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
