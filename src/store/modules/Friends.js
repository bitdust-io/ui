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
    UPDATE_FRIENDS(state, friendsList) {
        state.friendsList = friendsList;
    },
    UPDATE_LAST_FRIEND(state, friend) {
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
            commit('UPDATE_FRIENDS', friendsList.result);
        });
    },
    updateLastFriend({commit}, friend) {
        commit('UPDATE_LAST_FRIEND', friend);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    constants
};
