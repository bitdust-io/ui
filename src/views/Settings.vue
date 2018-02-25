<template>
    <div>
        <bit-header/>
        <div class="container">
            <navigation/>
            <div class="content">
                <h1 class="title">
                    Settings
                </h1>
                <ul>
                    <li>Set 01</li>
                    <li>Set 02</li>
                    <li>Set 03</li>
                </ul>

                <h2>Events - {{getEvents.length}}</h2>
                <ul>
                    <li v-for="event in getEvents">
                        {{event.status}}
                        <div v-for="item in event.result">
                            {{item.id}}
                            {{item.time | date}}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import navigation from '@/components/Navigation';
    import bitHeader from '@/components/BitHeader';
    import {mapGetters} from 'vuex';
    import Vue from 'vue';

    export default {
        name: 'users',
        components: {
            navigation,
            bitHeader
        },
        computed: {
            ...mapGetters([
                'getEvents'
            ])
        }
    };

    Vue.filter('date', function (value) {
        if (value) {
            return new Date(value * 1000);
        }
    });
</script>

<style scoped>
    ul {
        list-style: none;
    }
</style>
