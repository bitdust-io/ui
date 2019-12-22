import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {ChatStateInterface} from '@/types/chatTypes';
import api from '@/services/api';

function convertMessage(m: any, rootState: any) {
    const authorIsMe = rootState.applicationStore.identity.global_id === m.sender.replace('master$', '');
    return {
        author: authorIsMe ? 'me' : m.sender.replace('master$', ''),
        name: m.sender.replace('master$', ''),
        type: m.data.type,
        data: {
            [m.data.type]: m.data.message
        }
    };
}

export const state: ChatStateInterface = {
    messages: [],
    friends: []
};

const getters: GetterTree<ChatStateInterface, any> = {};

const mutations: MutationTree<ChatStateInterface> = {
    updateMessages(state, v) {
        state.messages.push(v);
    },
    updateFriends(state, v) {
        state.friends = v;
    }
};

const actions: ActionTree<ChatStateInterface, any> = {
    updateMessages({commit, rootState}, v) {
        const message = convertMessage(v, rootState);
        commit('updateMessages', message);
    },
    async getFriends({commit}) {
        const {result} = await api.getFriends();
        commit('updateFriends', result);
    }
};

export const chatStore: Module<ChatStateInterface, any> = {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
};
