import api from '../../services/api';

const constants = {};

const state = {
    filesList: [],
    sharedFilesList: [],
    currentFile: {},
    filesErrorLoading: true,
    downloads: [],
    uploads: {
        running: [],
        pending: []
    }
};

const getters = {
    getUploads: state => state.uploads,
    getDownloads: state => state.downloads,
    getFiles: state => state.filesList,
    getSharedFiles: state => state.sharedFilesList,
    currentFile: state => state.currentFile,
    hasFilePath(path) {
        if (!state.filesList) return [];
        return state.filesList.filter(file => file.path === path);
    },
    isFileLocked: state => {
        return id => {
            return state.downloads.find(file => file.key_id === id) ||
                state.uploads.running.find(file => file.key_id === id) ||
                state.uploads.pending.find(file => file.path_id.indexOf(id) > -1);
        };
    }
};

const mutations = {
    UPDATE_SHARED_FILE_LIST(state, value) {
        state.sharedFilesList = value;
    },
    UPDATE_FILE_LIST(state, value) {
        state.filesList = value;
    },
    UPDATE_CURRENT_FILE(state, file) {
        state.currentFile = state.filesList.find(item => item.name === file) || state.sharedFilesList.find(item => item.name === file);
    },
    UPDATE_CURRENT_FILE_DATA(state, file) {
        state.currentFile.versions = file;
    },
    UPDATE_FILES_ERROR_LOADING(state, value) {
        state.filesErrorLoading = value;
    },
    updateDownloads(state, value) {
        state.downloads = value;
    },
    updateUploads(state, value) {
        state.uploads = value;
    }
};

const actions = {
    updateUploads({commit}, data) {
        commit('updateUploads', data);
    },
    updateDownloads({commit}, data) {
        commit('updateDownloads', data);
    },
    updateCurrentFileData({commit}, data) {
        commit('UPDATE_CURRENT_FILE_DATA', data);
    },
    updateCurrentFile({commit}, data) {
        commit('UPDATE_CURRENT_FILE', data);
    },
    deleteFile({commit, dispatch}, currentFile) {
        if (confirm('Are you sure ?')) {
            api.deleteFile(currentFile.key_id + ':' + currentFile.path).then(data => {
                console.log('file removed', data);
                if (data.status === 'OK') {
                    dispatch('getApiFiles');
                    dispatch('updateOpenModal', false);
                }
            });
        }
    },
    getApiSharedFiles({commit}) {
        api.getSharedFiles().then(data => {
            commit('UPDATE_SHARED_FILE_LIST', data.result);
        });
    },
    getApiFiles({commit, dispatch}) {
        api.getFiles().then(data => {
            if (data.status === 'ERROR') {
                setTimeout(() => {
                    dispatch('getApiFiles');
                    commit('UPDATE_FILES_ERROR_LOADING', true);
                    console.log('retrying to get files');
                }, 1000);
            } else {
                commit('UPDATE_FILE_LIST', data.result);
                commit('UPDATE_FILES_ERROR_LOADING', false);
            }
        });
    },
    createFile({commit, dispatch}, file) {
        if (!file) return false;
        let filePath = file.files[0].path.replace(/\\/g, '/');
        let fileName = filePath.match(/\/([^/]*)$/)[1];
        // TODO Sanitize file name

        if (getters.hasFilePath(fileName).length === 0) {
            api.createFileShareKey().then(shareKeyData => {
                if (!shareKeyData.result && shareKeyData.status !== 'OK') return false;
                const keyId = shareKeyData.result[0].key_id;
                api.createPath(fileName, keyId).then(pathData => {
                    if (pathData.status === 'OK') {
                        api.createFile(keyId + ':' + fileName, filePath).then(fileData => {
                            if (fileData.status === 'OK') {
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
            });
        } else {
            let currentFile = getters.hasFilePath(fileName)[0];
            let remotePath = currentFile.key_id + ':' + currentFile.path;
            api.createFile(remotePath, filePath).then(data => {
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
