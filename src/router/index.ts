import Vue from 'vue';
import VueRouter from 'vue-router';
import Loading from '@/views/Loading.vue';
import Chat from '@/views/Chat.vue';
import Dead from '@/views/Dead.vue';
import ChatMessages from '@/components/ChatMessages.vue';

Vue.use(VueRouter);

const routes = [
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
        component: Loading
    },
    {
        path: '/loading-identity',
        name: 'loading-identity',
        component: Loading
    },
    {
        path: '/chat/',
        name: 'chat',
        component: Chat
        // children: [
        //     {
        //         path: ':id',
        //         name: 'chat-messages',
        //         component: ChatMessages
        //     }
        // ]
    },
    {
        path: '/chat/:id',
        name: 'chat-messages',
        component: ChatMessages
    },
    {
        path: '/dead',
        name: 'dead',
        component: Dead
    }
];

const router = new VueRouter({
    routes
});

export default router;
