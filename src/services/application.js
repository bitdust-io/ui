import Api from './api';
import message from './message';
import store from '../store/';
import Router from '../router';

let apiNotResponding = 0;

const Application = {

    keepConnection() {
        Api.networkConnected().then(resp => {
            store.commit('updateConnectionStatus', resp);
            setTimeout(() => {
                this.keepConnection();
            }, 1000);
        }).catch(() => {
            apiNotResponding += 1;
            if (apiNotResponding > 5) {
                Router.push('dead');
            }
            setTimeout(() => {
                this.keepConnection();
            }, 1000);
        });
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
