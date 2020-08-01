import Api from './api';
import store from '../store/';
import Router from '../router';

let apiHealthNotResponding = 0;
let wsUri = '';
if (window.API_SECRET) {
    wsUri = 'ws://127.0.0.1:8280/?api_secret=' + window.API_SECRET;
} else {
    wsUri = 'ws://127.0.0.1:8280/';
}
const websocket = new WebSocket(wsUri);
websocket.onopen = () => console.log('OPENED');
websocket.onclose = () => console.log('CLOSED');
websocket.onerror = (e) => console.log('ERROR', e);

const Application = {

    bootstrap() {
        this.keepHeath();
        this.eventsListen();
    },

    async keepHeath() {
        try {
            const { status } = await Api.processHealth();
            store.dispatch('updateHealthStatus', status);

            if (status === 'OK') {
                if (!store.state.Application.identity || !store.state.Application.identity.name) {
                    try {
                        const identityStatus = await Api.getIdentity();
                        store.dispatch('updateIdentity', identityStatus.result);
                        store.dispatch('updateUserFromApi');
                    } catch (e) {
                        store.dispatch('updateIdentity', { status: 'ERROR' });
                    }
                } else {
                    try {
                        const networkStatus = await Api.networkConnected();
                        store.dispatch('updateConnectionStatus', networkStatus);
                    } catch (e) {
                        store.dispatch('updateConnectionStatus', { status: 'ERROR' });
                    }
                }
            }

            apiHealthNotResponding = 0;
        } catch (e) {
            store.dispatch('updateHealthStatus', { status: 'ERROR' });
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
        websocket.onmessage = (d) => this.onMessage(d);
    },

    onMessage(message) {
        const data = JSON.parse(message.data);
        console.log(JSON.stringify(data, null, 0));
        store.dispatch('updateEvent', data);
        switch (data.type) {
            case 'stream_message':
                if (data.payload.payload.data.msg_type === 'private_message') {
                    const message = {
                        data: data.payload.payload.data,
                        recipient: data.payload.recipient.glob_id,
                        sender: data.payload.sender.glob_id,
                        time: data.payload.payload.time
                    };
                    store.dispatch('updateMessages', message);
                }
                break;
        }
    }
};

export default Application;
