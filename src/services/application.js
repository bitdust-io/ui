import Api from './api';
import message from './message';
import store from '../store/';
import Router from '../router';

// let connectionAttempts = 0;
let apiNotResponding = 0;

const Application = {

    keepConnection() {
        Api.networkConnected().then(resp => {
            store.commit('UPDATE_IS_CONNECTED', resp);

            // if (resp.status === 'ERROR') {
            //     connectionAttempts += 1;
            //     if (connectionAttempts > 20 && window.navigator.onLine) {
            //         Api.restartProcess();
            //         connectionAttempts = 0;
            //     }
            // }

            setTimeout(() => {
                this.keepConnection();
            }, 2000);
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
