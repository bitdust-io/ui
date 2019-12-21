import api from './api';
import store from '@/store';
import router from '@/router';

let apiHealthNotResponding = 0;

const Application = {

    bootstrap() {
        this.keepHeath();
        this.messagesListen();
    },

    async keepHeath() {
        try {
            const {status} = await api.processHealth();
            await store.dispatch('applicationStore/updateHealthStatus', status);

            if (status === 'OK') {
                if (!store.state.applicationStore.identity.name) {
                    try {
                        const [identity, user] = await Promise.all([api.getIdentity(), api.getUser()]);
                        await store.dispatch('applicationStore/updateIdentity', identity.result[0]);
                        await store.commit('applicationStore/updateUser', user.result[0]);
                    } catch (e) {
                        await store.dispatch('applicationStore/updateIdentity', api.constants.ERROR);
                    }
                } else {
                    try {
                        const networkStatus = await api.networkConnected();
                        await store.dispatch('applicationStore/updateConnectionStatus', networkStatus);
                    } catch (e) {
                        await store.dispatch('applicationStore/updateConnectionStatus', api.constants.ERROR);
                    }
                }
            }

            apiHealthNotResponding = 0;
        } catch (e) {
            await store.dispatch('applicationStore/updateHealthStatus', api.constants.ERROR);
            console.log('Error trying to connect health check');
            apiHealthNotResponding += 1;
        }

        if (apiHealthNotResponding > 5 && router.currentRoute.name !== 'dead') {
            await router.push('/dead');
        }

        setTimeout(() => {
            this.keepHeath();
        }, 1000);
    },

    async messagesListen() {
        if (store.state.Application.connectionStatus.status === 'OK') {
            try {
                const {result} = await api.getMessages();
                if (!result) return;
                debugger;
                store.dispatch('chat/updateMessages', result);
            } catch (e) {
                console.log('error receiving message');
            }
        }

        setTimeout(() => {
            this.messagesListen();
        }, 200);
    }
};

export default Application;
