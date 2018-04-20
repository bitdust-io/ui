<template>
    <i class="file-extension"
       v-bind:style="{ 'background': 'url(' + getExtension() + ')' }">
    </i>

</template>

<script>
    export default {
        name: 'fileExtension',
        data() {
            return {};
        },
        props: ['file'],
        methods: {
            getExtension() {
                if (!this.file) return;
                return this.makeUrl(this.file.match(/[^.]+$/));
            },
            makeUrl(extension) {
                return './static/extensions/' + extension + '.png';
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../static/css/imports";

    i {
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-right: 10px;
        background-size: 100% !important;
    }
</style>
