const state = {
    healthStatus: {},
    connectionStatus: {},
    identity: {}
};

const getters = {
    healthStatus: state => state.healthStatus,
    connectionStatus: state => state.connectionStatus,
    getIdentity: state => state.identity
};

const mutations = {
    updateHealthStatus(state, value) {
        state.healthStatus = value;
    },
    updateConnectionStatus(state, value) {
        state.connectionStatus = value;
    },
    updateIdentity(state, value) {
        state.identity = value;
    }
};

const actions = {
    updateHealthStatus({commit}, value) {
        commit('updateHealthStatus', value);
    },
    updateConnectionStatus({commit}, value) {
        commit('updateConnectionStatus', value);
    },
    updateIdentity({commit}, value) {
        commit('updateIdentity', value);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
