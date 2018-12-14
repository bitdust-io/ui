import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import application from './services/application';
import './assets/scss/styles.scss';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created: application.keepConnection()
});
