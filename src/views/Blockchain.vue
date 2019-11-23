<template>
    <div class="create-identity">
        <h1 class="title">
            Blockchain
        </h1>

        <div v-if="state" class="container"
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

        <div v-if="wallet" class="container">
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

            <div class="container">
                Change title
                <input v-model="name">

                <b-button type="is-info"
                          @click="changeText"
                          :disabled="isLoading">
                    Save
                </b-button>

            </div>
        </div>

        <form class="form"
              v-bind:class="{'is-loading' : isLoading}">

            <div class="container" v-if="!wallet">
                <input v-model="privateKey"
                       name="identity"
                       placeholder="Type your private key">

                <div v-if="error"
                     class="error">
                    <p>{{errorMessage}}</p>
                    <p>Please restart Bitdust and try again</p>
                </div>

                <b-button type="is-info"
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
</template>

<script>
    import Icon from '@/components/Globals/Icon';
    import {mapActions} from 'vuex';
    import Zillica from '../services/zilliqa';

    export default {
        name: 'create-identity',
        beforeCreate() {
            this.zilliqa = new Zillica();
        },
        async created() {
            document.getElementsByTagName('html')[0].classList.add('intro-background');
            const contract = await this.zilliqa.getContract('zil1gv2s54hhr04q9gdk3mwgva8cvpmqrnytqvyung');
            this.state = await this.zilliqa.getContractState(contract);
        },
        components: {
            Icon
        },
        data() {
            return {
                state: undefined,
                wallet: undefined,
                privateKey: '',
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
    @import "../assets/scss/includes.scss";

    h1 {
        color: $color-gray-1;
        margin: 80px 0 40px;
    }

    .container {
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
        font-size: 1.4rem;

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
