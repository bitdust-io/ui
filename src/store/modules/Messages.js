const constants = {};

const state = {
    messages: []
};

const getters = {
    getMessages: state => state.messages
};

const mutations = {
    updateMessages(state, message) {
        if (!message.result || !message.result.length) return;
        state.messages.push(message.result[0]);
    }
};

const actions = {
    updateMessages({commit}, value) {
        commit('updateMessages', value);
    }
};

export default {
    state,
    mutations,
    getters,
    actions,
    constants
};
