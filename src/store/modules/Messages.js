const constants = {};

const state = {
    messages: [],
    lastMessage: undefined
};

const getters = {
    getMessages: state => state.messages,
    getLastMessage: state => state.lastMessage
};

const mutations = {
    updateMessages(state, payload) {
        state.messages.push(payload);
        state.lastMessage = payload;
    },
    resetMessages(state) {
        state.messages = [];
    }
};

const actions = {
    updateMessages({commit}, value) {
        commit('updateMessages', value);
    },
    resetMessages({commit}) {
        commit('resetMessages');
    }
};

export default {
    state,
    mutations,
    getters,
    actions,
    constants
};
