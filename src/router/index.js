import Vue from 'vue';
import Router from 'vue-router';
import Loading from '../views/Loading';
import CreateIdentity from '../views/CreateIdentity';
import RecoverIdentity from '../views/Recover-identity';
import LoadingIdentity from '../views/Loading-identity';
import Onboarding from '../views/Onboarding';
import Dead from '../views/Dead';

Vue.use(Router);

function loadView(view) {
    return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

export default new Router({
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'loading',
            component: Loading
        },
        {
            path: '/create-identity',
            name: 'createIdentity',
            component: CreateIdentity
        },
        {
            path: '/recover-identity',
            name: 'recover-identity',
            component: RecoverIdentity
        },
        {
            path: '/loading-identity',
            name: 'loading-identity',
            component: LoadingIdentity
        },
        {
            path: '/onboarding',
            name: 'onboarding',
            component: Onboarding
        },
        {
            path: '/files',
            name: 'files',
            component: loadView('Files')
        },
        {
            path: '/friend/:id',
            name: 'friend',
            component: loadView('Friend')
        },
        {
            path: '/settings',
            name: 'settings',
            component: loadView('Settings'),
            children: [
                {
                    path: ':id',
                    name: 'setting'
                }
            ]
        },
        {
            path: '/dead',
            name: 'dead',
            component: Dead
        }
    ]
});
