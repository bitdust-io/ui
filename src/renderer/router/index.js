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
            name: 'home-page',
            component: require('@/views/HomePage').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});
