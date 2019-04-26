import Api from '../../services/api';

const state = {
    healthStatus: {},
    connectionStatus: {},
    identity: {},
    user: undefined,
    event: undefined
};

const getters = {
    healthStatus: state => state.healthStatus,
    connectionStatus: state => state.connectionStatus,
    getIdentity: state => state.identity,
    getUser: state => state.user,
    getEvent: state => state.event
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
    },
    updateUser(state, value) {
        debugger;
        state.user = value;
    },
    updateEvent(state, value) {
        state.event = value;
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
    },
    async updateUserFromApi({commit}) {
        const {result} = await Api.getUser();
        commit('updateUser', result[0]);
    },
    updateEvent({commit}, value) {
        commit('updateUser', value);
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};
