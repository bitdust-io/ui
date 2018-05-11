const constants = {};

const state = {
    messages: []
};

const getters = {
    getMessages: state => state.messages
};

const mutations = {
    UPDATE_MESSAGES(state, message) {
        if (!message.result || !message.result.length) return;
        state.messages.push(message.result[0]);
    },
    ADD_MESSAGE(state, message) {
        state.messages.push(message);
    }
};

const actions = {
    addMessage({commit}, value) {
        commit('ADD_MESSAGE', value);
    }
};

export default {
    state,
    mutations,
    getters,
    actions,
    constants
};
