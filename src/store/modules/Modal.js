const state = {
    isModalOpen: false
};

const getters = {
    getModalShouldOpen: state => state.isModalOpen
};

const actions = {
    updateOpenModal({ commit }, data) {
        commit('updateOpenModal', data);
    }
};

const mutations = {
    updateOpenModal(state, value) {
        state.isModalOpen = value;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
