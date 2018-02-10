const constants = {};

const state = {
    isLoaded: false,
    hasIdentity: false
};

const mutations = {
    UPDATE_IS_LOADED(state, value) {
        state.isLoaded = value;
    },
    UPDATE_IDENTITY(state, value) {
        state.hasIdentity = value;
    }
};

const actions = {};

export default {
    state,
    mutations,
    actions,
    constants
};
