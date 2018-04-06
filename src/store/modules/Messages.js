const constants = {};

const state = {
    messages: [],
    userKeyMessage: {}
};

const getters = {
    getMessages: state => state.messages
};

const mutations = {
    UPDATE_MESSAGES(state, message) {
        state.messages.unshift(message);
        if (state.userKeyMessage[message.result[0].sender] === undefined) {
            state.userKeyMessage[message.result[0].sender] = [];
        }
        state.userKeyMessage[message.result[0].sender].push(message);
        console.log(state.userKeyMessage);
    }
};

export default {
    state,
    mutations,
    getters,
    constants
};
