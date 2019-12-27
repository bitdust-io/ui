<template>
    <div class="recover-identity container default-padding">

        <h1 class="title primary has-text-primary">
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

            <div class="buttons">
                <b-button rounded
                          type="is-light">
                    <router-link to="/create-identity">
                        Return
                    </router-link>
                </b-button>
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
        methods: {
            restoreIdentity(event) {
                event.preventDefault();
                if (event.target.files && event.target.files[0]) {
                    let file = event.target.files[0].path;
                    if (!file) {
                        file = decodeURIComponent(event.target.files[0].name);
                    }
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

    .form {
        text-align: center;
    }

    .ui-input-recover {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    .ui-input-recover-label {
        width: 100%;
        max-width: 500px;
        height: 120px;
        display: block;
        padding: 31px 20px 20px;
        margin: 60px auto 0;
        cursor: pointer;
        border: 0;
        border-radius: 2px;
        background-color: $color-white;
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
            top: -30px;
            left: 50%;
            margin-left: -30px;
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

    .buttons {
        text-align: center;
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }

</style>
