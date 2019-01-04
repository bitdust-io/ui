import Api from './api';
import message from './message';
import store from '../store/';
import Router from '../router';

let apiNotResponding = 0;

const Application = {

    bootstrap() {
        this.keepConnection();
    },

    async keepConnection() {
        try {
            const status = await Api.networkConnected();
            store.commit('updateConnectionStatus', status);
        } catch (e) {
            apiNotResponding += 1;
            if (apiNotResponding > 5) {
                Router.push('/dead');
            }
        }

        setTimeout(() => {
            this.keepConnection();
        }, 1000);
    },

    eventsListen() {
        Api.eventsListen().then(resp => {
            this.eventsListen();
        });
    },

    messagesListen() {
        message.getMessages().then(resp => {
            this.messagesListen();
        });
    }
};

export default Application;
