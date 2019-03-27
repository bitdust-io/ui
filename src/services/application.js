import Api from './api';
import Message from './message';
import store from '../store/';
import Router from '../router';

let apiHealthNotResponding = 0;
let apiConnectionNotResponding = 0;

const Application = {

    bootstrap() {
        this.keepHeath();
        this.keepConnection();
        this.getIdentity();
        this.messagesListen();
        // this.eventsListen();
    },

    async keepHeath() {
        try {
            const status = await Api.processHealth();
            store.dispatch('updateHealthStatus', status);
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
        }, 2000);
    },

    async keepConnection() {
        if (store.state.Application.healthStatus.status === 'OK' &&
            store.state.Application.identity.name) {
            try {
                const status = await Api.networkConnected();
                store.dispatch('updateConnectionStatus', status);
                if (status.status === 'ERROR') {
                    apiConnectionNotResponding += 1;
                }
            } catch (error) {
                store.dispatch('updateConnectionStatus', {status: 'ERROR'});
                console.log('Error trying to connect to network');
                apiConnectionNotResponding += 1;
            }

            if (apiConnectionNotResponding > 10) {
                Router.push('/dead');
            }
        }

        setTimeout(() => {
            this.keepConnection();
        }, 2000);
    },

    async getIdentity() {
        if (!store.state.Application.identity.name &&
            store.state.Application.healthStatus.status === 'OK') {
            try {
                const status = await Api.getIdentity();
                store.dispatch('updateIdentity', status.result[0]);
            } catch (error) {
                store.dispatch('updateIdentity', {status: 'ERROR'});
                console.log('Error trying to get identity');
            }
        }

        setTimeout(() => {
            this.getIdentity();
        }, 2000);
    },

    async eventsListen() {
        // try {
        //     const currentEvent = await Api.eventsListen();
        //     // console.log('Event:', currentEvent);
        //     // store.dispatch('updateEvents', currentEvent);
        // } catch (e) {
        //     console.log('error receiving event', e);
        // }
        // this.eventsListen();
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
        }, 500);
    }
};

export default Application;
