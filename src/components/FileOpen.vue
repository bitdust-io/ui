<template>
    <div class="file-open" v-bind:class="{open: isFileOpen}">
        <div @click="stopPropagation($event)"
             class="file-open-container">
            <span @click="closeFile"
                  class="close">x
            </span>
            <div class="flex">
                <file-extension :file="currentFile.path"/>
                <h1>{{currentFile.name}}</h1>
            </div>
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

            <hr/>

            <div v-for="version in currentFile.versions">
                reliable: {{version.reliable}}
                delivered: {{version.delivered}}
            </div>
        </div>
        <i @click="closeFile" class="wall"></i>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Api from '../services/api';
    import FileExtension from '../components/FileExtension';

    export default {
        data() {
            return {
                downloadSuccess: false,
                downloadError: false,
                downloadIsLoading: false

            };
        },
        components: {
            FileExtension
        },
        methods: {
            ...mapActions([
                'deleteFile',
                'closeFile'
            ]),
            stopPropagation(event) {
                event.preventDefault();
            },
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
    @import "../../static/css/imports";

    .file-open-container {
        /*display: flex;*/
    }

    .flex {
        align-items: center;
    }

    .wall {
        background: rgba(0, 0, 0, .47);
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: -1;
    }

    .file-open {
        padding: 20px;
        position: fixed;
        opacity: 0;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        transition: all .2s ease-in-out;
        z-index: 2;
        visibility: hidden;

        &.open, &.open .wall {
            opacity: 1;
            visibility: visible;
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

    hr {
        margin: 10px 0;
    }

    .file-open-container {
        margin: auto;
        width: 50%;
        background: $color-white;
        padding: 30px 50px;
    }

    .close {
        float: right;
        cursor: pointer;
        padding: 10px;
        color: $color-gray;
        font-size: 1.6rem;

        &:hover {
            opacity: .6;
            background: red;
            color: $color-white;
        }
    }
</style>
