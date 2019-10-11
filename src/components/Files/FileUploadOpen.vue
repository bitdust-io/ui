<template>
    <div class="file-upload-open">
        <div>
            <font-awesome-icon icon="cloud-upload-alt"/>
            Upload your file
        </div>

        <div class="uploaded" v-if="isUploaded">
            <h2>Your upload was requested</h2>
            <div v-if="isUploading">
                Loading...
            </div>
        </div>
        <div class="upload" v-if="!isUploaded">
            <div class="select-key">
                <h4 class="title">Select a key</h4>
                <key-list :open-key="openKey"
                          @setKey="setOpenKey"
                          :config="{edit:false}"
                          class="key-list"
                          :update="timestamp"
                />
            </div>

            <div class="create-key">
                <h4 class="title">Create a new key:</h4>
                <input v-model="keyLabelInput"
                       placeholder="key label">
                <button @click="creatKey"
                        class="add"
                        :disabled="!keyLabelInput || keyLabelInput.length < 3">
                    <font-awesome-icon icon="plus-circle"/>
                </button>
            </div>

            <div class="dropbox"
                 :class="{'disabled':!openKey}">
                Select a file and upload to <span>{{keyLabel}}</span>
                <input type="file"
                       :disabled="!openKey"
                       :name="uploadFieldName"
                       @change="createFile($event.target)"
                       class="input-file">
            </div>
        </div>
    </div>
</template>

<script>
    import FilesService from '../../services/files';
    import keyList from './KeyList';

    export default {
        data() {
            return {
                uploadFieldName: '',
                openKey: undefined,
                keyLabelInput: undefined,
                timestamp: undefined,
                keyLabel: undefined,
                isUploading: false,
                isUploaded: false
            };
        },
        components: {
            keyList
        },
        props: {
            data: {
                type: Object
            }
        },
        mounted() {
            this.openKey = this.data.openKey;
            this.keyLabel = this.data.openLabel;
        },
        methods: {
            setOpenKey(key) {
                this.openKey = key.key;
                this.keyLabel = key.label;
            },
            async createFile(file) {
                this.isUploading = true;
                await FilesService.createFile(this.$store, file, this.openKey);
                this.isUploading = false;
                this.isUploaded = true;
            },
            async creatKey() {
                const result = await FilesService.createKey(this.keyLabelInput);
                this.timestamp = Date.now();
                this.openKey = result.key_id;
                this.keyLabel = this.keyLabelInput;
                this.keyLabelInput = undefined;
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .title {
        font-size: 1rem;
        display: block;
        margin: 4px 0;
    }

    .dropbox {
        margin-bottom: 20px;
        background: $color-blue-1;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        border-radius: 100px;
        color: $color-white;
        font-size: 1rem;
        padding: 10px 20px;
        position: relative;
        cursor: pointer;
        transition: all .2s ease-in-out;
        text-align: center;

        &:hover {
            background: $color-purple-1;
            border-radius: 0;
        }

        &.disabled {
            opacity: .4;
            filter: grayscale(1);
            cursor: not-allowed;
        }

        span {
            background: $color-blue-2;
            padding: 6px;
            margin: 2px;
        }
    }

    .input-file {
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        opacity: 0;
        width: 100%;
        position: absolute;
        cursor: pointer;
    }

    /deep/ .key-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .key-item.active {
            background: $color-purple-1;
            color: $color-white;
        }

        li {
            width: auto;
            margin: 4px 4px 4px 0;
            padding: 0 4px;
            border: 1px solid $color-purple-1;
        }

        .key-name {
            overflow: visible;
            margin: 0;
            padding: 0;
        }
    }

    .block {
        margin: 20px 0;
        background: $color-gray-4;
        padding: 14px;
    }

    .select-key {
        @extend .block;
    }

    .create-key {
        @extend .block;
        display: flex;
        align-items: center;

        input {
            width: 300px;
            padding: 4px;
            font-size: 1rem;
            margin: 0 10px;
        }

        .add {
            color: $color-purple-1;
            margin: 0 10px;
            cursor: pointer;
            font-size: 2rem;
            border: none;
            background: none;

            &:disabled {
                pointer-events: none;
                opacity: .4;
            }
        }
    }
</style>
