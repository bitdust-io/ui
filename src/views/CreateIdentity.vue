<template>
    <div class="create-identity">
        <h1 class="title">
            Welcome to BitDust
        </h1>

        <form class="form"
              v-bind:class="{'is-loading' : isLoading}">

            <div>
                <h2 class="header">
                    Create a username to get started
                </h2>

                <input v-model="identityName"
                       name="identity"
                       placeholder="Type your username">

                <p class="note">
                    Note: only lowercase letters and numbers. Min 3 and max 20 characters
                </p>

                <div v-if="error"
                     class="error">
                    <p>{{errorMessage}}</p>
                    <p>Please try again later</p>
                </div>

                <button class="button primary"
                        @click="createIdentity"
                        :disabled="!isInputValid || isLoading">Create user
                </button>

                <router-link to="/recover-identity"
                             class="text-link">Recover identity?
                </router-link>
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

    export default {
        name: 'create-identity',
        created() {
            document.getElementsByTagName('html')[0].classList.add('intro-background');
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
        color: $color-gray-1;
        margin: 80px 0 40px;
    }

    h2 {
        color: $color-gray-1;
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

    .button {
        font-size: 2.2rem;
        display: block;
        width: 420px;
        height: 65px;
        margin: 4rem auto 2rem;
        transition: all 1s ease;

        &:disabled {
            filter: grayscale(1);
            opacity: .7;
            cursor: not-allowed;
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
