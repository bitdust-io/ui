import api from '../../services/api';

const constants = {};

const state = {
    filesList: [],
    isFileOpen: false,
    isFriendOpen: false,
    currentFile: {},
    currentFriend: {},
    friendsList: []
};

const getters = {
    getFriends: state => state.friendsList,
    getFiles: state => state.filesList,
    isFileOpen: state => state.isFileOpen,
    isFriendOpen: state => state.isFriendOpen,
    currentFile: state => state.currentFile,
    currentFriend: state => state.currentFriend,
    hasFilePath(path) {
        return state.filesList.filter(file => file.path === path);
    }
};

const mutations = {
    UPDATE_FILE_LIST(state, value) {
        state.filesList = value;
    },
    UPDATE_IS_FILE_OPEN(state, value) {
        state.isFileOpen = value;
    },
    UPDATE_CURRENT_FILE(state, file) {
        state.currentFile = state.filesList.filter(item => item.name === file)[0];
    },
    UPDATE_IS_FRIEND_OPEN(state, value) {
        state.isFriendOpen = value;
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
    openFile({commit}, file) {
        commit('UPDATE_CURRENT_FILE', file);
        commit('UPDATE_IS_FILE_OPEN', true);
    },
    openFriend({commit}, friend) {
        commit('UPDATE_CURRENT_FRIEND', friend.global_id);
        commit('UPDATE_IS_FRIEND_OPEN', true);
    },
    closeFriend({commit}) {
        commit('UPDATE_IS_FRIEND_OPEN', false);
    },
    closeFile({commit}) {
        commit('UPDATE_IS_FILE_OPEN', false);
    },
    updateIsFileOpen({commit}, value) {
        commit('UPDATE_IS_FILE_OPEN', value);
    },
    deleteFile({commit, dispatch}, path) {
        if (confirm('Are you sure ?')) {
            api.deleteFile(path).then(data => {
                console.log('file removed', data);
                if (data.ok) {
                    dispatch('getApiFiles');
                    dispatch('closeFile');
                }
            });
        }
    },
    getApiFiles({commit}) {
        api.getFiles().then(data => {
            commit('UPDATE_FILE_LIST', data.result);
        });
    },
    createFile({commit, dispatch}, file) {
        if (!file) return false;
        let filePath = file.files[0].path;
        let fileName = filePath.match(/\/([^/]*)$/)[1];

        if (getters.hasFilePath(fileName).length === 0) {
            api.createPath(fileName).then(data => {
                if (data.status === 'OK') {
                    api.createFile(fileName, filePath).then(data => {
                        if (data.status === 'OK') {
                            console.log('file: ', fileName, 'Created');
                        }
                    }).catch(err => {
                        console.log('error: ', err);
                    });
                    setTimeout(() => {
                        dispatch('getApiFiles');
                    }, 500);
                }
            });
        } else {
            api.createFile(fileName, filePath).then(data => {
                if (data.status === 'OK') {
                    console.log('file: ', fileName, 'Created');
                }
            }).catch(err => {
                console.log('error: ', err);
            });
            setTimeout(() => {
                dispatch('getApiFiles');
            }, 500);
        }
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    constants
};
