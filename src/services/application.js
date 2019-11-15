import Api from './api';
import Message from './message';
import store from '../store/';
import Router from '../router';

let apiHealthNotResponding = 0;
const wsUri = 'ws://localhost:8280/';
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
                if (!store.state.Application.identity.name) {
                    try {
                        const identityStatus = await Api.getIdentity();
                        store.dispatch('updateIdentity', identityStatus.result[0]);
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
            console.log('Error trying to connect health check');
            apiHealthNotResponding += 1;
        }

        if (apiHealthNotResponding > 5) {
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
                const currentMessage = await Message.getMessages();
                console.log(currentMessage);
                store.dispatch('updateMessages', currentMessage);
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
