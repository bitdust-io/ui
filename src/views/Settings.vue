<template>
    <div class="about">
        <h1>Settings</h1>

        <button @click="backupKey" class="button primary">Backup key</button>
    </div>
</template>

<script>
    import Api from '../services/api';

    export default {
        name: 'Settings',
        methods: {
            backupKey() {
                Api.identityBackup();
            }
        }
    };
</script>
