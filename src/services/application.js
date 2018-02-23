import Api from './api';
import store from '../store/';
import Router from '../router';

const Application = {

    keepConnection() {
        Api.networkConnected().then(resp => {
            store.commit('UPDATE_IS_CONNECTED', resp.status);
            setTimeout(() => {
                this.keepConnection();
            }, 5000);
        }).catch(() => {
            Router.push('dead');
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
