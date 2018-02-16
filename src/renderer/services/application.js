import Api from './api';
import store from '../store/';

const Application = {

    keepConnection() {
        Api.networkConnected().then(resp => {
            store.commit('UPDATE_IS_CONNECTED', resp.status);
            // this.keepConnection();
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
