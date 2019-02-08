import api from '../../services/api';

const constants = {};

const state = {
    friendsList: [],
    lastFriend: undefined
};

const getters = {
    getFriends: state => state.friendsList,
    getLastFriend: state => state.lastFriend
};

const mutations = {
    updateFriends(state, friendsList) {
        state.friendsList = friendsList;
    },
    updateLastFriend(state, friend) {
        state.lastFriend = friend;
    }
};

const actions = {
    removeFriend({commit, dispatch}, id) {
        api.removeFriend(id).then(resp => {
            dispatch('getApiFriends');
        });
    },
    getApiFriends({commit}) {
        api.userList().then(friendsList => {
            commit('updateFriends', friendsList.result);
        });
    },
    updateLastFriend({commit}, friend) {
        commit('updateLastFriend', friend);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    constants
};
