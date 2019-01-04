import Vue from 'vue';
import Router from 'vue-router';
import Loading from '../views/Loading';
import CreateIdentity from '../views/CreateIdentity';
import Files from '../views/Files';
import RecoverIdentity from '../views/Recover-identity';
import LoadingIdentity from '../views/Loading-identity';
import OnboardingSteps from '../components/onboarding/onboarding';
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
            path: '/onboarding-steps',
            name: 'onboarding-steps',
            component: OnboardingSteps
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
            component: Settings
        },
        {
            path: '/dead',
            name: 'dead',
            component: Dead
        }
    ]
});
