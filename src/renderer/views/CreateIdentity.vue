<template>
    <div>
        <h1>
            BitDust - Create Identity
        </h1>

        <div>
            <h2>
                Create Identity
            </h2>
            <input v-model="identity"
                   name="identity"/>
            <button class="alt" @click="createIdentity()">create</button>
        </div>
        <hr>
        <div>
            <h2>
                Recover Identity
            </h2>
            <input @change="upload($event)"
                   type="file"
                   name="file"/>
            <button class="alt" @click="restoreIdentity()">create</button>

            {{error}}
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
                identity: '',
                error: ''
            };
        },
        methods: {
            createIdentity() {
                console.log('create');
            },
            restoreIdentity() {
                console.log(this.file);
            },
            upload(e) {
                e.preventDefault();
                let file = event.target.files[0].path;
                Api.recoverIdentityFile(file).then(resp => {
                    if (resp.status === 'OK') {
                        Api.serviceStop('gateway').then(stopResp => {
                            // if (stopResp.status === 'OK') {
                            Api.serviceStop('gateway').then(startResp => {
                                // if (startResp === 'OK') {
                                this.$router.push('home');
                                // }
                            });
                            // }
                        });
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
</style>
