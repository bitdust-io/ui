<template>
    <div class="events">
        <h2 class="events-title">
            Total ({{getEvents.length}})
        </h2>
        <ul class="event-list">
            <li v-for="event in getEvents">
                {{event.status}}
                <div v-for="item in event.result">
                    {{item.id}}
                    {{item.time | date}}
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'Events',
        computed: {
            ...mapGetters([
                'getEvents'
            ])
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .events-title {
        font-size: .8rem;
    }

    .event-list {
        font-size: .8rem;
        height: 400px;
        overflow: auto;
    }
</style>
