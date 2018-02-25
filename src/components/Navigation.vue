<template>
    <nav>
        <ul>
            <li>
                <router-link to="/home">
                    Files
                </router-link>
            </li>
            <li>
                <router-link to="/users">
                    Users
                </router-link>
            </li>
            <li>
                <router-link to="/settings">
                    Settings
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
</script>

<style scoped lang="scss">
    nav {
        position: absolute;
        width: 200px;
        margin-top: -100px;
        top: 50%;
    }
    ul {
        list-style: none;
        width: 200px;

        li {
            a {
                text-decoration: none;
                padding: 10px;
                display: block;

                &.router-link-active {
                    background: #333;
                    color: #fff;
                }
            }
        }
    }
</style>
