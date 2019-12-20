import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/dead',
        name: 'dead',
        component: () => import(/* webpackChunkName: "dead" */ '../views/Dead.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
