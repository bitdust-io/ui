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
            path: '/users',
            name: 'users',
            component: require('@/views/Friends').default
        },
        {
            path: '/settings',
            name: 'settings',
            component: require('@/views/Settings').default
        },
        {
            path: '/dead',
            name: 'dead',
            component: require('@/views/Dead').default
        },
        {
            path: '/loading-identity',
            name: 'loading-identity',
            component: require('@/views/LoadingIdentity').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
