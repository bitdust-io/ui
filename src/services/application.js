import Api from './api';
import Message from './message';
import store from '../store/';
import Router from '../router';

let apiHealthNotResponding = 0;
const wsUri = 'ws://127.0.0.1:8280/?api_secret=' + window.API_SECRET;
const websocket = new WebSocket(wsUri);
websocket.onopen = () => console.log('OPENED');
websocket.onclose = () => console.log('CLOSED');
websocket.onerror = (e) => console.log('ERROR', e);

const Application = {

    bootstrap() {
        this.keepHeath();
        this.messagesListen();
        this.eventsListen();
    },

    async keepHeath() {
        try {
            const {status} = await Api.processHealth();
            store.dispatch('updateHealthStatus', status);

            if (status === 'OK') {
                if (!store.state.Application.identity || !store.state.Application.identity.name) {
                    try {
                        const identityStatus = await Api.getIdentity();
                        store.dispatch('updateIdentity', identityStatus.result);
                        store.dispatch('updateUserFromApi');
                    } catch (e) {
                        store.dispatch('updateIdentity', {status: 'ERROR'});
                    }
                } else {
                    try {
                        const networkStatus = await Api.networkConnected();
                        store.dispatch('updateConnectionStatus', networkStatus);
                    } catch (e) {
                        store.dispatch('updateConnectionStatus', {status: 'ERROR'});
                    }
                }
            }

            apiHealthNotResponding = 0;
        } catch (e) {
            store.dispatch('updateHealthStatus', {status: 'ERROR'});
            console.log('Error trying to connect health check', e);
            apiHealthNotResponding += 1;
        }

        if (apiHealthNotResponding > 5 && Router.currentRoute.name !== 'dead') {
            Router.push('/dead');
        }

        setTimeout(() => {
            this.keepHeath();
        }, 500);
    },

    eventsListen() {
        websocket.onmessage = (d) => store.dispatch('updateEvent', JSON.parse(d.data));
    },

    async messagesListen() {
        if (store.state.Application.connectionStatus.status === 'OK') {
            try {
                const {result} = await Message.getMessages();
                if (!result) return;
                store.dispatch('updateMessages', result);
            } catch (e) {
                console.log('error receiving message');
            }
        }

        setTimeout(() => {
            this.messagesListen();
        }, 100);
    }
};

export default Application;
