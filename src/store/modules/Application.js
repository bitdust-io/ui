const state = {
    connectionStatus: {}
};

const getters = {
    connectionStatus: state => state.connectionStatus
};

const mutations = {
    updateConnectionStatus(state, value) {
        state.connectionStatus = value;
    }
};

const actions = {
    updateConnectionStatus({commit}, value) {
        commit('updateConnectionStatus', value);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
