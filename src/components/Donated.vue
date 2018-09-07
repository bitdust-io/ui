<template>
    <div class="donated">

        <div v-if="donated.customers">

            <div class="stats">

                <ul class="stats-numbers">
                    <li>
                        <icon name="person"
                              class="icon"
                              size="xl"/>
                        <span class="label">
                    {{donated.customers_num}}
                </span>
                        Total customers
                    </li>
                    <li>
                        <icon name="undo"
                              class="icon"
                              size="xl"/>
                        <span class="label">
                    {{donated.donated | formatSize}}
                </span>
                        Donated
                    </li>
                    <li>
                        <icon name="label"
                              class="icon"
                              size="xl"/>
                        <span class="label">
                    {{donated.consumed | formatSize}}
                </span>
                        Consumed
                    </li>
                    <li>
                        <icon name="label"
                              class="icon"
                              size="xl"/>
                        <span class="label">
                    {{donated.free | formatSize}}
                </span>
                        Free
                    </li>
                    <li>
                        <icon name="label"
                              class="icon"
                              size="xl"/>
                        <span class="label">
                    {{donated.consumed_percent}}
                </span>
                        Free percent
                    </li>
                    <li>
                        <icon name="label"
                              class="icon"
                              size="xl"/>
                        <span class="label">
                    {{donated.used_str}}
                </span>
                        Total used
                    </li>
                    <li>
                        <icon name="label"
                              class="icon"
                              size="xl"/>
                        <span class="label">
                    {{donated.used_percent}}
                </span>
                        Total used percent
                    </li>
                </ul>

                <pie-chart :chart-data="datacollection"
                           :width="400"
                           :height="400"
                           class="graph"/>
            </div>

            <div class="customer">
                <h3>
                    Customers details
                </h3>

                <ul>
                    <li v-for="(item, index) in donated.customers" :key="index">
                        <icon name="person"
                              class="icon"
                              size="xl"/>
                        <div>
                            <div>{{item.idurl}}</div>
                            <p><span class="label">{{item.consumed | formatSize}}</span> Donated</p>
                            <p><span class="label">{{item.real_str}}</span> Used</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <h3 v-else>
            You have no customers yet.
        </h3>

    </div>
</template>

<script>
    import Vue from 'vue';
    import Api from '../services/api';
    import Icon from './Generic/Icon/Icon';
    import Graph from './DonatedGraph';
    import PieChart from './PieChart.js';

    Vue.filter('formatSize', (a, b) => {
        if (a === 0) return '0 Bytes';
        let c = 1024;
        let d = b || 2;
        let e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        let f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
    });

    export default {
        name: 'Donated',
        data() {
            return {
                donated: {
                    customers: []
                },
                datacollection: {}
            };
        },
        created() {
            Api.getDonated().then(data => {
                this.donated = data.result[0];
                this.makeGraphData();
            });
        },
        components: {
            Icon,
            Graph,
            PieChart
        },
        methods: {
            convertToMb(a) {
                return a / 1024;
            },
            getLabels() {
                const regex = /[^/]+$/;
                let labels = this.donated.customers.map(item => item.idurl.match(regex, '')) || [];
                labels.push('Free Space');
                return labels;
            },
            getNumbers() {
                let donated = this.donated.customers.map(item => this.convertToMb(item.consumed));
                donated.push(this.convertToMb(this.donated.free));
                return donated;
            },
            makeGraphData() {
                this.datacollection = {
                    labels: this.getLabels(),
                    datasets: [
                        {
                            backgroundColor: [
                                '#41B883',
                                '#E46651',
                                '#00D8FF',
                                '#DD1B16'
                            ],
                            data: this.getNumbers()
                        }
                    ]
                };
            }
        },
        mounted() {
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .stats {
        display: flex;

        &-numbers {
            min-width: 300px;
        }
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
    }

    .icon {
        margin-right: 15px;
    }

    .label {
        padding: 4px 6px;
        background: $color-white;
        margin-right: 5px;
    }

    .customer {
        margin-top: 40px;
        p {
            margin: 15px 0;
            display: block;
        }
    }

</style>
