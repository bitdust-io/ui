import Api from './api';
import Message from './message';
import store from '../store/';
import Router from '../router';

let apiNotResponding = 0;

const Application = {

    bootstrap() {
        this.keepConnection();
        this.messagesListen();
        this.eventsListen();
    },

    async keepConnection() {
        try {
            const status = await Api.networkConnected();
            store.dispatch('updateConnectionStatus', status);
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
        try {
            const currentMessage = await Message.getMessages();
            console.log(currentMessage);
            store.dispatch('updateMessages', currentMessage);
        } catch (e) {
            console.log('error receiving message', e);
        }
        this.messagesListen();
    }
};

export default Application;
