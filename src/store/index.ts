import Vue from 'vue';
import Vuex from 'vuex';
import {applicationStore} from '@/store/modules/application.store';
import {chatStore} from '@/store/modules/chat.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        applicationStore,
        chatStore
    }
});
