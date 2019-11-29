<template>
    <div class="create-identity container default-padding">

        <form class="form"
              :class="{'is-loading' : isLoading}">

            <h1 class="title primary has-text-primary">
                Welcome to BitDust
            </h1>

            <b-field label="Create a username to get started"
                     :type="{'is-success': isInputValid}"
                     message="Only lowercase letters and numbers, min 3 and max 20 characters">

                <b-input name="identity"
                         v-model="identityName"
                         value="Type your username"
                         maxlength="20"
                         size="is-large"
                         minlength="3"/>
            </b-field>

            <div v-if="error"
                 class="error">
                <p>{{errorMessage}}</p>
                <p>Please restart Bitdust and try again</p>
            </div>

            <div class="buttons">
                <b-button type="is-success"
                          size="is-large"
                          @click="createIdentity"
                          :disabled="!isInputValid || isLoading">
                    START
                </b-button>

                <b-button rounded
                          type="is-light">
                    <router-link to="/recover-identity">Recover identity?
                    </router-link>
                </b-button>

            </div>

            <icon name="loading"
                  class="rotating"
                  size="md"/>
        </form>
    </div>
</template>

<script>
    import Api from '../services/api';
    import Icon from '@/components/Globals/Icon';
    import {mapActions} from 'vuex';

    export default {
        name: 'create-identity',
        created() {
            document.getElementsByTagName('body')[0].classList.add('intro-background');
        },
        components: {
            Icon
        },
        data() {
            return {
                identityName: '',
                error: '',
                errorMessage: '',
                isLoading: false
            };
        },
        computed: {
            isInputValid() {
                return this.validateUserName(this.identityName);
            }
        },
        methods: {
            ...mapActions(['updateIdentity']),
            validateUserName(value) {
                const REGEX = /^[a-z0-9]{3,20}$/;
                return REGEX.test(value);
            },
            createIdentity(e) {
                e.preventDefault();
                if (this.validateUserName(this.identityName)) {
                    this.isLoading = true;

                    console.log('creating idendity', this.identityName);

                    Api.createIdentity(this.identityName).then(resp => {
                        this.isLoading = false;
                        if (resp.status === 'OK') {
                            this.updateIdentity(resp.result[0]);
                            this.$router.push('loading-identity');
                        } else {
                            this.error = true;
                            this.errorMessage = resp.errors[0];
                        }
                    });
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
        @include font-size($xx-font-sizes);
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

    .buttons {
        margin-top: 60px;
        display: flex;
        justify-content: center;
        flex-direction: column;

        .button {
            margin-bottom: 20px;
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

</style>
