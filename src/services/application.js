import api from './api';
import message from './message';
import store from '../store/';
import Router from '../router';

let connectionAttempts = 0;

const Application = {

    keepConnection() {
        api.networkConnected().then(resp => {
            store.commit('UPDATE_IS_CONNECTED', resp);
            setTimeout(() => {
                this.keepConnection();
            }, 2000);
        }).catch(() => {
            connectionAttempts += 1;
            if (connectionAttempts > 5) {
                Router.push('dead');
            }
            setTimeout(() => {
                this.keepConnection();
            }, 1000);
        });
    },

    eventsListen() {
        api.eventsListen().then(resp => {
            store.commit('UPDATE_LAST_EVENT', resp);
            this.eventsListen();
        });
    },

    messagesListen() {
        message.getMessages().then(resp => {
            store.commit('UPDATE_MESSAGES', resp);
            this.messagesListen();
        });
    }
};

export default Application;
