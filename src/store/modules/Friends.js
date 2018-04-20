import api from '../../services/api';

const constants = {};

const state = {
    isFriendDetailsOpen: false,
    currentFriend: {},
    friendsList: [],
    friendsListClone: []
};

const getters = {
    getFriends: state => state.friendsList,
    isFriendDetailsOpen: state => state.isFriendDetailsOpen,
    currentFriend: state => state.currentFriend,
    getCurrentFriendData() {
        if (!state.friendsList) return [];
        return state.friendsList.filter(friend => friend.global_id === state.currentFriend.global_id);
    }
};

const mutations = {
    UPDATE_IS_FRIEND_OPEN(state, value) {
        state.isFriendDetailsOpen = value;
    },
    UPDATE_CURRENT_FRIEND(state, friend) {
        state.currentFriend = state.friendsList.filter(item => item.global_id === friend)[0];
    },
    UPDATE_FRIENDS(state, friendsList) {
        state.friendsList = friendsList;
    }
};

const actions = {
    removeFriend({commit, dispatch}, id) {
        api.removeFriend(id).then(resp => {
            // TODO handle response
            dispatch('getApiFriends');
            dispatch('closeFriend');
        });
    },
    getApiFriends({commit}) {
        api.userList().then(friendsList => {
            commit('UPDATE_FRIENDS', friendsList.result);
        });
    },
    openFriend({commit}, friend) {
        commit('UPDATE_CURRENT_FRIEND', friend.global_id);
        commit('UPDATE_IS_FRIEND_OPEN', true);
    },
    closeFriend({commit}) {
        commit('UPDATE_IS_FRIEND_OPEN', false);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    constants
};
