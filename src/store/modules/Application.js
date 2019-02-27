const state = {
    connectionStatus: {},
    identity: {}
};

const getters = {
    connectionStatus: state => state.connectionStatus,
    getIdentity: state => state.identity
};

const mutations = {
    updateConnectionStatus(state, value) {
        state.connectionStatus = value;
    },
    updateIdentity(state, value) {
        state.identity = value;
    }
};

const actions = {
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
