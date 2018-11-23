<template>
    <div id="app">
        <img alt="Vue logo" src="@/assets/logo.svg">
        <div id="nav">
            <router-link v-for="(item, index) in items"
                         :key="index" :to="item.path">
                {{item.name}}
            </router-link>

        </div>
        <router-view/>
        {{connectionStatus}}
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'App',
        data() {
            return {items: []};
        },
        computed: {
            ...mapGetters(['connectionStatus'])
        },
        created() {
            this.$router.options.routes.forEach(route => {
                this.items.push({
                    name: route.name,
                    path: route.path
                });
            });
        }
    };
</script>
<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
