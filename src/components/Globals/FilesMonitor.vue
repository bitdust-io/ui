<template>
    <div class="file-monitor">
        <div v-if="getDownloads.length > 0"
             class="downloads">
            <font-awesome-icon icon="cloud-download-alt" />
            {{getDownloads.length}}
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
                'updateDownloads'
            ])
        },
        computed: {
            ...mapGetters([
                'connectionStatus',
                'getDownloads'
            ]),
            ...mapState(['files'])
        },
        watch: {
            async connectionStatus(response) {
                if (response.status === 'OK') {
                    const {result} = await api.getDownloads();
                    this.updateDownloads(result);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .file-monitor {

    }

    .downloads {
        color: $color-white;
        border: 1px solid $color-white;
        border-radius: 10px;
        padding: 4px 10px;
        margin-right: 20px;
        font-size: 1rem;
    }
</style>
