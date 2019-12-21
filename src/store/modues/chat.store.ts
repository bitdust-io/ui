import {ActionTree, GetterTree, Module, MutationTree} from 'vuex';
import {ChatStateInterface} from '@/types/chatTypes';
import api from '@/services/api';

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
    updateMessages({commit}, v) {
        commit('updateMessages', v);
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
