import store from '../../store';

const constants = {};

const state = {
    isLoaded: false,
    hasIdentity: false,
    identity: {},
    connectionStatus: undefined,
    events: [],
    lastEvent: {
        status: undefined
    }
};

const getters = {
    connectionStatus: state => state.connectionStatus,
    getLastEvent: state => state.lastEvent,
    getEvents: state => state.events,
    getIdentity: state => state.identity
};

const mutations = {
    UPDATE_IS_LOADED(state, value) {
        state.isLoaded = value;
    },
    UPDATE_HAS_IDENTITY(state, value) {
        state.hasIdentity = value;
    },
    UPDATE_IS_CONNECTED(state, value) {
        state.connectionStatus = value;
    },
    UPDATE_LAST_EVENT(state, value) {
        state.lastEvent = value;
        store.commit('UPDATE_EVENTS', value);
    },
    UPDATE_EVENTS(state, value) {
        state.events.unshift(value);
    },
    UPDATE_IDENTITY(state, value) {
        state.identity = value;
    }
};

const actions = {
    updateIdentity({commit}, value) {
        commit('UPDATE_IDENTITY', value);
    }
};

export default {
    state,
    mutations,
    getters,
    actions,
    constants
};
