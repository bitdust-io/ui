<template>
    <div class="dropbox"
         @click="openCreateFileModal()">
        <font-awesome-icon icon="cloud-upload-alt"/>
        UPLOAD
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    import ModalService from '@/services/modal';
    import UploadFileOpen from './FileUploadOpen';

    export default {
        data() {
            return {
                uploadFieldName: ''
            };
        },
        props: {
            openKey: {
                type: String
            },
            openLabel: {
                type: String
            }
        },
        methods: {
            ...mapActions([
                'createFile'
            ]),
            openCreateFileModal() {
                ModalService.openModal({
                    component: UploadFileOpen,
                    type: 'center',
                    transitionFrom: 'top',
                    props: {openKey: this.openKey, openLabel: this.openLabel}
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

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

</style>
