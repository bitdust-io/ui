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
                        Type in the username you want...
                    </legend>
                    <input class="ui-input" type="text" v-model="identityName"
                           name="identity" placeholder="Type your username" >
                    <p>Note: only lowercase letters and numbers. Min 3 and max 20 characters</p>
                    <button class="alt ui-button"
                            @click="createIdentity">Create user
                    </button>
                    <br/>
                    {{errorMessage}}
                </fieldset>
                <fieldset>
                    <router-link to="/recover-identity" class="anchor color-blue">Recover an existing identity</router-link>
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
            createIdentity() {
                console.log('creating idendity', this.identityName);
                this.isLoading = true;
                Api.createIdentity(this.identityName).then(resp => {
                    this.isLoading = false;
                    if (resp.status === 'OK') {
                        this.$router.push('loading-identity');
                    } else {
                        this.errorMessage = resp.errors[0];
                    }
                });
            },
            restoreIdentity(e) {
                e.preventDefault();
                let file = event.target.files[0].path;
                Api.recoverIdentityFile(file).then(resp => {
                    if (resp.status === 'OK') {
                        this.$router.push('loading-identity');
                    } else {
                        this.error = true;
                    }
                });
            }
        }
    };
</script>

<style scoped lang="scss">

    .section-create-identity {
        align-items: center;
        justify-content: center;

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
        }

        .ui-button {
            font-size: 2.2rem;
            width: 100%;
            max-width: 420px;
            height: 65px;
            margin: 6rem auto 2rem;
        }

        .anchor {
            display: block;
            font-size: 1.2rem;
            padding: 10px;
            margin: 0 auto;
            width: auto;
            text-decoration: none;
        }

        p {
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
            background: red;
        }
    }

</style>
