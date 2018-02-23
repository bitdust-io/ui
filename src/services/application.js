import Api from './api';
import store from '../store/';
// import Router from '../router';

let connectionAttempts = 0;

const Application = {

    keepConnection() {
        Api.networkConnected().then(resp => {
            store.commit('UPDATE_IS_CONNECTED', resp.status);
            setTimeout(() => {
                this.keepConnection();
            }, 5000);
        }).catch(() => {
            connectionAttempts += 1;
            if (connectionAttempts > 5) {
                alert('you fucked, should do something');
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
    }
};

export default Application;
