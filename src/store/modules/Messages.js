const constants = {};

const state = {
    messages: []
};

const getters = {
    getMessages: state => state.messages
};

const mutations = {
    UPDATE_MESSAGES(state, message) {
        state.messages.unshift(message);
    }
};

export default {
    state,
    mutations,
    getters,
    constants
};
