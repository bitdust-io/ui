<template>
    <div class="small">
        <pie-chart :chart-data="datacollection"/>
    </div>
</template>

<script>
    import PieChart from './PieChart.js';

    export default {
        components: {
            PieChart
        },
        data() {
            return {
                datacollection: null
            };
        },
        mounted() {
            this.datacollection = {
                labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
                datasets: [
                    {
                        backgroundColor: [
                            '#41B883',
                            '#E46651',
                            '#00D8FF',
                            '#DD1B16'
                        ],
                        data: [40, 20, 80, 10]
                    }
                ]
            };
        }
    };
</script>

<style>
    .small {
        max-width: 600px;
        margin: 150px auto;
    }
</style>

<!--<script>-->
<!--import {Line} from 'vue-chartjs';-->

<!--export default {-->
<!--name: 'Graph',-->
<!--extends: Line,-->
<!--props: ['data', 'options'],-->
<!--mounted() {-->
<!--this.renderChart(this.data, this.options)-->
<!--}-->
<!--};-->
<!--</script>-->
