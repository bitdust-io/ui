import api from './api';
import store from '@/store';
import router from '@/router';

let apiHealthNotResponding = 0;

const Application = {

    bootstrap() {
        this.keepHeath();
    },

    async keepHeath() {
        try {
            const {status} = await api.processHealth();
            await store.dispatch('application/updateHealthStatus', status);

            if (status === 'OK') {
                if (!store.state.application.identity.name) {
                    try {
                        const {result} = await api.getIdentity();
                        await store.dispatch('application/updateIdentity', result[0]);
                        await store.dispatch('application/updateUserFromApi');
                    } catch (e) {
                        await store.dispatch('updateIdentity', api.constants.ERROR);
                    }
                } else {
                    try {
                        const networkStatus = await api.networkConnected();
                        await store.dispatch('updateConnectionStatus', networkStatus);
                    } catch (e) {
                        await store.dispatch('updateConnectionStatus', api.constants.ERROR);
                    }
                }
            }

            apiHealthNotResponding = 0;
        } catch (e) {
            await store.dispatch('application/updateHealthStatus', api.constants.ERROR);
            console.log('Error trying to connect health check');
            apiHealthNotResponding += 1;
        }

        if (apiHealthNotResponding > 5 && router.currentRoute.name !== 'dead') {
            await router.push('/dead');
        }

        setTimeout(() => {
            this.keepHeath();
        }, 1000);
    }
};

export default Application;
