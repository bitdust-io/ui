<template>
    <grid-content>
        <div slot="menu">
            <div v-if="state" class="inner-container"
                 :class="{'is-loading' : isLoading}">

                <div class="card">
                    <div class="card-content">
                        <p class="subtitle">
                            {{state.welcome_msg}}
                        </p>
                    </div>
                    <footer class="card-footer">
                        <p class="card-footer-item">
                            Contract balance:
                        </p>
                        <p class="card-footer-item">
                            {{state._balance}}
                        </p>
                    </footer>
                </div>
            </div>
        </div>
        <div slot="main">
            <div class="block-chain">
                <h1 class="title">
                    Blockchain
                </h1>

                <div v-if="wallet" class="inner-container">
                    <div class="card">
                        <div class="card-content">
                            <p class="title">
                                <a :href="`https://viewblock.io/zilliqa/address/${wallet.address}?network=testnet`"
                                   target="_blank">
                                    {{wallet.address}}
                                </a>
                            </p>
                            <p class="subtitle">
                                {{wallet.key}}
                            </p>
                        </div>
                        <footer class="card-footer">
                            <p class="card-footer-item">
                                Contract balance:
                            </p>
                            <p class="card-footer-item">
                                {{wallet.result.balance}}
                            </p>
                        </footer>
                    </div>

                    <div class="inner-container">
                        Change title
                        <input v-model="name">

                        <b-button type="is-primary"
                                  @click="changeText"
                                  :disabled="isLoading || !name">
                            Save
                        </b-button>

                    </div>
                </div>

                <form class="form"
                      v-bind:class="{'is-loading' : isLoading}">

                    <div class="inner-container" v-if="!wallet">
                        <input v-model="privateKey"
                               name="private-key"
                               placeholder="Type your private key">

                        <div v-if="error"
                             class="error">
                            <p>{{errorMessage}}</p>
                            <p>Please restart Bitdust and try again</p>
                        </div>

                        <b-button type="is-primary"
                                  @click="openWallet"
                                  :disabled="!isInputValid || isLoading">
                            Open wallet
                        </b-button>

                    </div>

                    <icon name="loading"
                          class="rotating"
                          size="md"/>
                </form>
            </div>
        </div>
    </grid-content>
</template>

<script>
    import Buefy from 'buefy';
    import Icon from '@/components/Globals/Icon';
    import {mapActions} from 'vuex';
    import Zillica from '../services/zilliqa';
    import Vue from 'vue';
    import GridContent from '../components/Globals/GridContent';

    Vue.use(Buefy);

    export default {
        name: 'create-identity',
        beforeCreate() {
            this.zilliqa = new Zillica();
        },
        async created() {
            document.getElementsByTagName('html')[0].classList.add('intro-background');
            const contract = await this.zilliqa.getContract('zil1w75jm0pg4hf78udx3ut2qr8uw2gy0hlvjjw8k2');
            this.state = await this.zilliqa.getContractState(contract);
        },
        components: {
            GridContent,
            Icon
        },
        data() {
            return {
                state: undefined,
                wallet: undefined,
                privateKey: '64a96805901e23f646b32f3a758a783e3e735f4bed6958c2efc65c46c1541241',
                name: '',
                error: '',
                errorMessage: '',
                isLoading: false
            };
        },
        computed: {
            isInputValid() {
                return this.validatePrivateKey(this.privateKey);
            }
        },
        methods: {
            ...mapActions(['updateIdentity']),
            validatePrivateKey(value) {
                // const REGEX = /^[a-z0-9]{3,20}$/;
                // return REGEX.test(value);
                // todo validate it
                return true;
            },
            async changeText(e) {
                e.preventDefault();
                this.isLoading = true;
                this.state = await this.zilliqa.setMessage(this.name);
                this.isLoading = false;
            },
            async openWallet(e) {
                e.preventDefault();
                if (this.validatePrivateKey(this.privateKey)) {
                    this.isLoading = true;
                    this.wallet = await this.zilliqa.setWalltet(this.privateKey);
                    this.isLoading = false;
                } else {
                    this.error = true;
                    this.errorMessage = 'Please use a valid user name';
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "~buefy/src/scss/buefy-build";
    @import "../assets/scss/includes.scss";

    h1 {
        color: $color-gray-1;
        margin: 80px 0 40px;
    }

    .inner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 40px;
    }

    .form {
        text-align: center;

        &.is-loading {

            pointer-events: none;

            div {
                opacity: .2;
            }

            .rotating {
                display: inline-block;
            }
        }
    }

    input {
        background: $color-white;
        border: 1px solid $color-gray-2;
        box-shadow: 0 4px 13px 0 rgba(0, 0, 0, 0.05);
        text-align: center;
        width: 100%;
        max-width: 580px;
        height: 60px;
        margin: 20px 0;
        font-size: .8rem;

        &::placeholder {
            color: $color-gray-2;
        }
    }

    .note {
        font-size: 0.9rem;
        color: $color-gray-1;
    }

    .is-loading {
        opacity: 0.5;
    }

    .error {
        margin-top: 40px;
        color: $color-purple-1;
    }

    .rotating {
        display: none;
        margin: -310px 0 0 -50px;
        fill: $color-purple-1;
    }

    .state {

        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>
