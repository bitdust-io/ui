<template>
    <div class="files">
        <div class="menu">
            <ul>
                <li>
                    My Files
                </li>
                <li>
                    Shared Files
                </li>
            </ul>
        </div>
        <div class="main">
            <h2>
                My Files
            </h2>
        </div>
    </div>
</template>
<script>
    export default {
        created() {
            document.getElementsByTagName('html')[0].classList.remove('intro-background');
        }
    };
</script>
<style lang="scss" scoped>

    @import "../assets/scss/includes.scss";

    .files {
        display: flex;
        justify-content: space-between;
        height: 100%;
    }

    .menu {
        width: 300px;
    }

    .main {
        flex: 1;
    }
</style>
