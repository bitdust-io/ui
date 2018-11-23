import Vue from 'vue';
import Router from 'vue-router';
import Loading from './views/Loading';
import CreateIdentity from './views/CreateIdentity';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'loading',
            component: Loading
        },
        {
            path: '/create-identity',
            name: 'createIdentity',
            component: CreateIdentity
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import(/* webpackChunkName: "about" */ './views/CreateIdentity.vue')
        }
    ]
});
