<template>
    <div class="file-open">
        <div @click="stopPropagation($event)">
            <div class="flex">
                <h1>
                    <font-awesome-icon icon="key"/>
                    {{data.label}}
                </h1>
            </div>

            <div class="edit-key">
                <div v-if="!isEditing">
                    <button class="button primary is-small"
                            @click="edit">
                        Edit key name
                    </button>
                </div>

                <button @click="deleteKey"
                        class="button warn is-small">
                    delete key
                    <span v-if="error">{{error}}</span>
                </button>

                <div v-if="isEditing">

                    <input class="input"
                           v-model="data.label">

                    <button @click="cancel"
                            class="button slim is-small">cancel
                    </button>

                    <button @click="save"
                            class="button primary is-small">save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from '../../services/api';

    export default {
        data() {
            return {
                isEditing: false,
                alias: undefined,
                error: undefined
            };
        },
        props: {
            data: {
                type: Object
            }
        },
        components: {},
        methods: {
            stopPropagation(event) {
                event.preventDefault();
            },
            edit() {
                this.isEditing = true;
            },
            save() {
                api.editKeyLabel(this.data.key_id, this.data.label);
                this.isEditing = false;
            },
            cancel() {
                this.isEditing = false;
            },
            async deleteKey() {
                const {status} = await this.$api.removeFileShareKey(this.data.key_id);
                status === 'OK' ? this.$emit('closeModal') : this.error = status;
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .flex {
        align-items: center;
        display: flex;
    }

    h1 {
        font-size: 1rem;
    }

    .edit-key {
        margin-top: 20px;

        .input {
            padding: 6px;
            font-size: .9rem;
            display: block;
            width: 100%;
        }

        button {
            margin-right: 10px;
        }
    }
</style>
