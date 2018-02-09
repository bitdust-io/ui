const constants = {};

const state = {
    isLoaded: false,
    hasUserCreated: false
};

const mutations = {
    UPDATE_IS_LOADED(state, value) {
        state.isLoaded = value;
    }
};

const actions = {};

export default {
    state,
    mutations,
    actions,
    constants
};
