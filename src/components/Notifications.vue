<template>
    <div class="notifications"
         v-if="hasNewFile"
         @click="closeNotification()">
        <span class="icon"></span>
        <p>
            You have a new shared file: <strong>{{fileFrom}}</strong>
        </p>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import userFirstLetter from './UserFirstLetter';

    export default {
        components: {userFirstLetter},
        data() {
            return {
                SHARED_FILE: 'shared-list-files-received',
                hasNewFile: false,
                fileFrom: ''
            };
        },
        methods: {
            closeNotification() {
                this.hasNewFile = false;
            }
        },
        computed: {
            ...mapGetters([
                'getLastEvent'
            ])
        },
        watch: {
            'getLastEvent': function (response) {
                if (!response.result) return;
                response.result.forEach(resultItem => {
                    if (resultItem.id === this.SHARED_FILE) {
                        this.hasNewFile = true;
                        this.fileFrom = resultItem.data.customer_idurl;
                    }
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../src/assets/scss/colors";

    .notifications {

        cursor: pointer;
        font-size: .8rem;
        margin-right: 20px;
        display: flex;
        background: $color-blue;
        padding: 10px;
        border: 1px solid $color-white;
        transition: background-color .3s;

        &:hover {
            background: $color-blue-5;
        }

        .icon {
            margin-right: 10px;
            width: 20px;
            height: 20px;
            border: 1px solid $color-white;
            border-radius: 50%;
            background: $color-blue-5;
            display: block;
        }
    }
</style>
