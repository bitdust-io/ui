import Vue from 'vue';
import Vuex from 'vuex';
import {applicationStore} from '@/store/modues/application.store';
import {chatStore} from '@/store/modues/chat.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        applicationStore,
        chatStore
    }
});
