<template>
    <section class="bg-wave section-create-identity">
        <article>
            <header>
                <h1 class="page-title">
                    Welcome to BitDust
                </h1>
            </header>

            <form class="form" v-bind:class="{'is-loading' : isLoading}">
                <fieldset>
                    <legend class="header">
                        Please choose your username...
                    </legend>
                    <input class="ui-input"
                           v-model="identityName"
                           name="identity"
                           placeholder="username">
                    <p class="note">Note: only lowercase letters and numbers. Min 3 and max 20 characters</p>

                    <div v-if="error"
                         class="error">
                        <p>{{errorMessage}}</p>
                    </div>

                    <button class="ui-button primary"
                            @click="createIdentity">Create user
                    </button>

                </fieldset>
                <fieldset>
                    <router-link to="/recover-identity"
                                 class="anchor color-blue">Recover an existing identity
                    </router-link>
                </fieldset>
            </form>
        </article>
    </section>
</template>

<script>
    import Api from '../services/api';

    export default {
        name: 'create-identity',
        components: {},
        data() {
            return {
                identityName: '',
                error: '',
                errorMessage: '',
                isLoading: false
            };
        },
        methods: {
            validateUserName(username) {
                const REGEX = /^[a-z0-9]{2,20}$/;
                return REGEX.test(username);
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

    @import "../../src/assets/scss/colors";

    .section-create-identity {
        align-items: center;
        justify-content: center;
    }

    header {
        margin-bottom: 2em;
    }

    .form {
        text-align: center;
    }

    .ui-input {
        text-align: center;
        width: 100%;
        max-width: 580px;
        height: 60px;
        margin: 1.5rem 0 1rem;
        color: $color-gray;

        &::placeholder {
            color: $color-gray-2;
        }
    }

    .ui-button {
        font-size: 2.2rem;
        width: 100%;
        max-width: 420px;
        height: 65px;
        margin: 4rem auto 2rem;
    }

    .note {
        font-size: 0.9rem;
    }

    legend.header {
        font-size: 1.8rem;
        font-weight: normal;
        letter-spacing: 0.02rem;
        width: 100%;
        padding: 0px;
    }

    .is-loading {
        opacity: 0.5;
    }

    .error {
        margin-top: 40px;
    }

</style>
