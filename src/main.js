import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import application from './services/application';
import './assets/scss/styles.scss';
import api from './services/api';

// Font Awesome Icons
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

library.add(fas, far);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.prototype.$api = api;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {App},
    template: '<App/>',
    created: application.bootstrap()
});
