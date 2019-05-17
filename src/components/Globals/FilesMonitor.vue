<template>
    <div class="file-monitor">
        <div v-if="getDownloads.length > 0"
             class="status">
            <font-awesome-icon icon="cloud-download-alt" />
            {{getDownloads.length}}
        </div>

        <div v-if="getUploads.running.length > 0 || getUploads.pending.length > 0"
             class="status">
            <font-awesome-icon icon="cloud-upload-alt" />
            {{getUploads.running.length}} / {{getUploads.pending.length}}
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions, mapState} from 'vuex';
    import api from '../../services/api';

    export default {
        data() {
            return {};
        },
        methods: {
            ...mapActions([
                'updateDownloads',
                'updateUploads'
            ])
        },
        computed: {
            ...mapGetters([
                'connectionStatus',
                'getDownloads',
                'getUploads'
            ]),
            ...mapState(['files'])
        },
        watch: {
            async connectionStatus(response) {
                if (response.status === 'OK') {
                    const {result} = await api.getDownloads();
                    const uploads = await api.getUploads();
                    this.updateDownloads(result);
                    this.updateUploads(uploads.result);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .file-monitor {
        display: flex;

    }

    .status {
        color: $color-white;
        border: 1px solid $color-white;
        border-radius: 10px;
        padding: 4px 10px;
        margin-right: 20px;
        font-size: 1rem;
    }
</style>
