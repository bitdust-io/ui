<template>
    <div class="recover-identity">

        <h1 class="page-title">
            Recover your identity
        </h1>

        <form class="form"
              :class="{'is-loading' : isLoading}">

            <label class="ui-input-recover-label"
                   for="file">
                Click to upload your identity
            </label>

            <input class="ui-input-recover"
                   @change="restoreIdentity($event)"
                   type="file"
                   name="file"
                   id="file"/>

            <p class="page-subtitle">
                or
            </p>

            <div class="content">

                <label class="ui-label"
                       for="privateKey">
                    Paste your private key below:
                </label>

                <textarea class="ui-input"
                          v-model="privateKey"
                          name="privateKey"
                          id="privateKey"
                          placeholder="Paste here...">
                </textarea>

                <div v-if="error"
                     class="error">
                    <p>{{errorMessage}}</p>
                </div>

                <button class="ui-button primary"
                        :disabled="!isKeyValid"
                        @click="restoreIdentity">Restore
                </button>

                <router-link to="/create-identity"
                             class="text-link">
                    Go back
                </router-link>
            </div>

        </form>
    </div>
</template>

<script>
    import Api from '../services/api';

    export default {
        name: 'recover-identity',
        components: {},
        data() {
            return {
                privateKey: '',
                error: false,
                errorMessage: '',
                isLoading: false
            };
        },
        computed: {
            isKeyValid() {
                return this.validatePrivateKey(this.privateKey);
            }
        },

        methods: {
            validatePrivateKey(value) {
                // TODO Add proper key regex validation
                return value.length > 10 && value.indexOf('END RSA PRIVATE KEY') > -1;
            },
            restoreIdentity(e) {
                e.preventDefault();
                if (event.target.files && event.target.files[0]) {
                    let file = event.target.files[0].path;
                    if (!file) {
                        this.error = true;
                        this.errorMessage = 'Your uploaded identity is not valid';
                        return;
                    }
                    Api.recoverIdentityFile(file).then(resp => {
                        if (resp.status === 'OK') {
                            this.$router.push('loading-identity');
                        } else {
                            this.error = true;
                            this.errorMessage = 'Your uploaded identity is not valid';
                        }
                    });
                } else {
                    if (this.validatePrivateKey(this.privateKey)) {
                        Api.recoverIdentityKey(this.privateKey).then(resp => {
                            if (resp.status === 'OK') {
                                this.error = false;
                                this.$router.push('loading-identity');
                            } else {
                                this.error = true;
                                this.errorMessage = 'Your uploaded identity is not valid';
                            }
                        });
                    } else {
                        this.error = true;
                        this.errorMessage = 'Please fill in a valid KEY or upload your identity file';
                    }
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../assets/scss/includes.scss";

    .recover-identity {
        align-items: center;
        justify-content: center;
    }

    .page-title {
        color: $color-gray-1;
        margin: 80px 0 40px;
    }

    .page-subtitle {
        font-size: 1.5rem;
        margin: 1.5rem auto;
    }

    .form {
        text-align: center;
    }

    .content {
        margin: auto;
    }

    .ui-label {
        display: block;
    }

    .ui-input {
        display: block;
        font-size: 0.9rem;
        width: 100%;
        max-width: 580px;
        height: 100px;
        margin: 1.5rem auto 1rem;
        padding: 4px;
    }

    .ui-button {

        &:disabled {
            filter: grayscale(1);
            opacity: .7;
            cursor: not-allowed;
        }

        &.primary {
            font-size: 2.2rem;
            width: 100%;
            max-width: 420px;
            height: 65px;
            margin: 2.5rem auto 2rem;
        }
    }

    .ui-input-recover {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    .ui-input-recover {
        width: 100%;
        max-width: 580px;
        height: 60px;
        margin: 1rem auto 0;
        display: block;
    }

    p {
        font-size: 0.9rem;
    }

    .ui-input-recover-label {
        width: 100%;
        max-width: 500px;
        height: 60px;
        display: block;
        padding: 11px 20px 20px;
        margin: 0 auto;
        cursor: pointer;
        border: 0;
        border-radius: 2px;
        background-color: #FFFFFF;
        box-shadow: 0 0.3rem 1rem 0 rgba(0, 0, 0, 0.05);
        -webkit-font-smoothing: antialiased;
        font-stretch: normal;
        line-height: normal;
        position: relative;

        &:hover {
            &:after {
                opacity: .8;
            }
        }

        &:after {
            content: "+";
            position: absolute;
            z-index: 1;
            width: 60px;
            height: 60px;
            background-color: #76be28;
            border-radius: 5rem;
            top: 0;
            right: -80px;
            color: #F4F7FE;
            font-size: 2.8rem;
            line-height: 50px;

        }
    }

    .is-loading {
        background: red;
    }

    .error {
        color: $color-purple-1;
    }

</style>
