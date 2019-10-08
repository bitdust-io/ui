<template>
    <ul class="user-keys">
        <li v-for="(key, index) in shareList"
            :key="index"
            class="key-item"
            :class="{'active': activeKey === key.key_id}">

            <span @click="open(key)"
                  class="edit"
                  v-if="config.edit">
                <font-awesome-icon icon="edit"/>
            </span>

            <span class="key-name"
                  @click="setKey(key)"
            >{{key.label}}</span>
        </li>
    </ul>
</template>

<script>
    import {mapGetters} from 'vuex';
    import api from '../../services/api';

    export default {
        data() {
            return {
                shareList: undefined,
                activeKey: undefined

            };
        },
        props: {
            activeTab: {
                type: String
            },
            openKey: {
                type: String
            },
            config: {
                type: Object
            },
            update: {
                type: Number
            }
        },
        components: {},
        methods: {
            open(key) {
                this.$emit('open', key);
            },
            setKey(key) {
                this.$emit('setKey', {key: key.key_id, isShare: this.config.isShare, label: key.label});
            },
            makeConfig() {
                let result = this.config.isShare;
                return result ? 'granted=1&mine=0&all_customers=1' : 'granted=0&mine=1';
            },
            async getKeys() {
                const {result} = await api.getShareList(this.makeConfig());
                this.shareList = result;
            }
        },
        computed: {
            ...mapGetters([
                'connectionStatus'
            ])
        },
        created() {
            this.getKeys();
        },
        watch: {
            activeTab(tab) {
                if (tab === 'myShares') this.activeKey = undefined;
            },
            openKey(key) {
                this.activeKey = key;
            },
            update() {
                this.getKeys();
            },
            connectionStatus() {
                this.getKeys();
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/scss/includes.scss";

    .user-keys {
        width: 100%;
    }

    li {
        width: 100%;
        height: 30px;
        list-style: none;
        font-size: .8rem;
        position: relative;
        display: flex;
        align-items: center;

        &:before {
            transition: width .2s ease-in-out;
            z-index: -1;
            position: absolute;
            content: '';
            height: 100%;
            width: 0;
            background: $color-purple-1;
            color: $color-white;
        }

        &:hover {
            .key-name {
                flex: 2;
            }
        }

        &.active {
            color: $color-white;

            &:before {
                width: 100%;
            }

            svg {
                color: $color-white;
            }
        }
    }

    .key-item {
        margin-left: 20px;

        &:hover {
            .edit svg {
                visibility: visible;
                font-size: initial;
                max-width: 30px;
                transform: scale(1);
            }
        }
    }

    .key-name {
        transition: padding .2s ease;
        overflow: hidden;
        max-width: 70%;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        margin-left: 10px;
        padding: 5px 0;

        &:hover {
            opacity: .6;
        }
    }

    .edit {

        &:hover {
            opacity: .4;
        }

        svg {
            transition: all .2s ease;
            margin-left: 10px;
            cursor: pointer;
            color: $color-purple-1;
            visibility: visible;
            max-width: 0;
            transform: scale(0);
        }
    }
</style>
