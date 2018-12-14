<template>
    <div id="app">
        <div id="nav">
            <router-link v-for="(item, index) in items"
                         :key="index"
                         :to="item.path">
                {{ item.name }}
            </router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
        created() {
            this.items = [];
            this.$router.options.routes.forEach(route => {
                this.items.push({
                    name: route.name,
                    path: route.path
                });
            });
        }
    };
</script>
<style lang="scss" scoped>
    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;
            &.router-link-exact-active {
                color: red;
            }
        }
    }
</style>
