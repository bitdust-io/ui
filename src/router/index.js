import Vue from 'vue';
import Router from 'vue-router';
import Loading from '../views/Loading';
import CreateIdentity from '../views/CreateIdentity';
import Files from '../views/Files';
import RecoverIdentity from '../views/Recover-identity';
import LoadingIdentity from '../views/Loading-identity';
import Onboarding from '../views/Onboarding';
import Friend from '../views/Friend';
import Dead from '../views/Dead';
import Settings from '../views/Settings';

Vue.use(Router);

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
            component: Files
        },
        {
            path: '/friend/:id',
            name: 'friend',
            component: Friend
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
            children: [
                {
                    path: ':id',
                    name: 'settings'
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
