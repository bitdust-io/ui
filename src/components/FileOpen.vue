<template>
    <div class="user-files" v-bind:class="{open: isFileOpen}">
        <span @click="closeFile"
              class="close">close</span>
        <h1>{{currentFile.name}}</h1>
        <button @click="downloadFile">download</button>
        <button @click="deleteFile(currentFile.path)">delete</button>
        <div v-if="downloadIsLoading">
            Loading
        </div>
        <div v-if="downloadSuccess">
            Download {{currentFile.path}} Success
        </div>
        <div v-if="downloadError">
            Download {{currentFile.path}} Error
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Api from '../services/api';

    export default {
        data() {
            return {
                downloadSuccess: false,
                downloadError: false,
                downloadIsLoading: false

            };
        },
        methods: {
            ...mapActions([
                'getApiFiles',
                'deleteFile',
                'closeFile'
            ]),
            downloadFile() {
                this.downloadIsLoading = true;
                this.downloadSuccess = false;
                this.downloadError = false;
                Api.downloadFile(this.currentFile.path).then(resp => {
                    if (resp.ok) {
                        this.downloadSuccess = true;
                    } else {
                        this.downloadError = true;
                    }
                    this.downloadIsLoading = false;
                });
            },
            resetOpenFile() {
                this.downloadSuccess = false;
                this.downloadSuccess = false;
                this.downloadError = false;
            }
        },
        computed: {
            ...mapGetters([
                'getFiles',
                'isFileOpen',
                'currentFile'
            ])
        },
        watch: {
            'currentFile': function (response) {
                if (response) {
                    this.resetOpenFile();
                }
            },
            'isFileOpen': function (response) {
                if (!response) {
                    this.resetOpenFile();
                }
            }
        },
        mounted() {
            window.addEventListener('keyup', (ev) => {
                if (ev.code === 'Escape') {
                    this.closeFile();
                }
            });
        }
    };
</script>

<style scoped lang="scss">
    .user-files {
        background: #ccc;
        padding: 20px;
        position: fixed;
        right: -201px;
        width: 200px;
        top: 0;
        bottom: 0;
        transition: all .3s ease-in-out;

        &.open {
            transform: translate3d(-200px, 0, 0);
        }

        h1 {
            font-size: 16px;
            margin: 20px 0;
        }
    }

    li {
        list-style: none;
        color: #888;
        font-size: 18px;
        margin-top: 10px;

        span {
            background: red;
            color: white;
            padding: 5px;
            display: inline-block;
            cursor: pointer;
        }
    }

</style>
