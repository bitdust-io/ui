<template>
    <div class="user-identity">
        <user-first-letter :name="getIdentity.name"/>
        <div class="user-name">{{getIdentity.name}}</div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Api from '../services/api';
    import userFirstLetter from './UserFirstLetter';

    export default {
        components: {userFirstLetter},
        computed: {
            ...mapGetters([
                'getIdentity'
            ])
        },
        methods: {
            ...mapActions([
                'updateIdentity'
            ]),
            checkIdentity() {
                return !!this.getIdentity.name;
            }
        },
        created() {
            if (this.checkIdentity()) return;
            Api.getIdentity().then(resp => {
                if (resp.status === 'OK') {
                    this.updateIdentity(resp.result[0]);
                }
            }).catch(err => {
                console.log(err);
            });
        }
    };
</script>

<style scoped lang="scss">
    @import "../../static/css/variables";

    .user-identity {
        display: flex;
        align-items: center;
    }

    .user-name {
        text-transform: capitalize;
    }
</style>
