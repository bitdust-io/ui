import Vue from 'vue';
import Vuex from 'vuex';
import {applicationStore} from '@/store/modues/application.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        application: applicationStore
    }
});
