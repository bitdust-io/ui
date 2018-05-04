<template>
    <nav>
        <ul>
            <li>
                <router-link to="/home"
                             class="icon-file">
                    Files
                </router-link>
            </li>
            <li>
                <router-link to="/users"
                             class="icon-user">
                    Friends
                </router-link>
            </li>
            <li>
                <router-link to="/settings"
                             class="icon-settings">
                    Settings
                </router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'isFileOpen'
            ])
        }
    };
</script>

<style scoped lang="scss">

    @import "../../src/assets/scss/mixins";

    nav {
        transition: all .3s ease-in-out;
        position: fixed;
        width: 300px;
        margin-top: -280px;
        top: 50%;

        @include separator;

        &:before {
            left: 301px;
        }

        &:after {
            left: 300px;
        }

        &:before, &:after {
            position: fixed;
            bottom: -1000px;
            top: 0;
        }

    }

    ul {
        list-style: none;
        width: 300px;

        li {
            a {
                font-size: 1.2rem;
                text-transform: uppercase;
                text-decoration: none;
                padding: 24px 0 24px 120px;
                display: block;
                background-position: 70px center;
                color: #333333;
                margin: 10px 0;
                transition: all .2s ease;

                &.router-link-active {
                    background-color: rgba(255, 255, 255, .9);
                }
                &:hover {
                    color: rgba(0, 0, 0, .4);

                }
                &:before {
                    content: '';
                    width: 30px;
                    height: 30px;
                }
            }
        }
    }

    .icon-file {
        background-position: 80px center;
    }
</style>
