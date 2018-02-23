<template>
    <div>
        <h1>
            BitDust - Create Identity
        </h1>

        <div v-bind:class="{'is-loading' : isLoading}">
            <h2>
                Create Identity
            </h2>
            <input v-model="identityName"
                   name="identity"/>
            <button class="alt"
                    @click="createIdentity">create
            </button>
            <br/>
            {{errorMessage}}
        </div>
        <hr>
        <div>
            <h2>
                Recover Identity
            </h2>
            <input @change="restoreIdentity($event)"
                   type="file"
                   name="file"/>
        </div>
    </div>
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

<style scoped>
    div {
        margin: 20px;
    }

    .is-loading {
        background: red;
    }
</style>
