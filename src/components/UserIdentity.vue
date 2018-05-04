<template>
    <div class="user-identity">
        <div class="avatar">{{userFirstLetter}}</div>
        <div class="user-name">{{getIdentity.name}}</div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import Api from '../services/api';

    export default {
        computed: {
            ...mapGetters([
                'getIdentity'
            ]),
            userFirstLetter() {
                if (!this.checkIdentity()) return;
                return this.getIdentity.name.substring(0, 1);
            }
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
    @import "../../src/assets/scss/colors";

    .user-identity {
        display: flex;
        align-items: center;
    }

    .user-name {
        text-transform: capitalize;
    }

    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #440044;
        text-transform: uppercase;
        color: $color-white;
        text-align: center;
        line-height: 50px;
        font-size: 2rem;
        margin-right: 10px;
    }
</style>
