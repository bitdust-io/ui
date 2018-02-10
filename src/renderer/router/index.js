import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'loading',
            component: require('@/views/Loading').default
        },
        {
            path: '/home',
            name: 'home',
            component: require('@/views/Home').default
        },
        {
            path: '/create-identity',
            name: 'create-identity',
            component: require('@/views/CreateIdentity').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
