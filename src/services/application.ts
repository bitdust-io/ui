import api from './api';
import store from '@/store';
import router from '@/router';

let apiHealthNotResponding = 0;
const wsUri = 'ws://localhost:8280/';
const websocket = new WebSocket(wsUri);
websocket.onopen = () => Application.startSockets();
websocket.onclose = () => console.log('CLOSED');
websocket.onerror = (e) => console.log('ERROR', e);
websocket.onmessage = (m) => Application.onMessage(m);

const Application = {

    bootstrap() {
        this.keepHeath();
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
                        await store.dispatch('chatStore/getFriends');
                    } catch (e) {
                        await store.dispatch('applicationStore/updateIdentity', api.constants.ERROR);
                        if (router.currentRoute.name !== 'create-identity') {
                            await router.push('/create-identity');
                        }
                    }
                } else {
                    try {
                        const {status} = await api.networkConnected();
                        await store.dispatch('applicationStore/updateConnectionStatus', status);
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
        }, 200);
    },

    onMessage(message: MessageEvent): void {
        const data = JSON.parse(message.data);
        switch (data.type) {
            case 'private_message':
                store.dispatch('chatStore/updateMessages', data.payload);
                break;
            default:
                console.log(message);
        }
    },

    startSockets() {
        console.log('Socket is open');
        // websocket.send('{"command": "api_call", "method": "message_history", "kwargs": {"user": "severino@p2p-id.ru"}, "call_id": "2”}');
        // websocket.send('{"command": "api_call", "method": "message_history", "kwargs": {"user": "severino@p2p-id.ru"}, "call_id": "123"}');
        // websocket.send('{"command": "api_call", "method": “friend_list", "kwargs": {}, "call_id": “1234”}');
    }
};

export default Application;
