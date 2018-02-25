import store from '../../store';

const constants = {};

const state = {
    isLoaded: false,
    hasIdentity: false,
    connectionStatus: undefined,
    events: [],
    lastEvent: {
        status: undefined
    }
};

const getters = {
    connectionStatus: state => state.connectionStatus,
    getLastEvent: state => state.lastEvent,
    getEvents: state => state.events
};

const mutations = {
    UPDATE_IS_LOADED(state, value) {
        state.isLoaded = value;
    },
    UPDATE_IDENTITY(state, value) {
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
    }
};

export default {
    state,
    mutations,
    getters,
    constants
};
