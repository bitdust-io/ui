import Api from '../../services/api';
import store from '../../store';

const constants = {};

const state = {
    fileList: [],
    isFileOpen: false,
    currentFile: {}
};

const getters = {
    getFiles: state => state.fileList,
    isFileOpen: state => state.isFileOpen,
    currentFile: state => state.currentFile
};

const mutations = {
    UPDATE_FILE_LIST(state, value) {
        state.fileList = value;
    },
    UPDATE_IS_FILE_OPEN(state, value) {
        state.isFileOpen = value;
    },
    UPDATE_CURRENT_FILE(state, file) {
        state.currentFile = state.fileList.filter(item => item.name === file)[0];
    }
};

const actions = {
    openFile(store, file) {
        store.commit('UPDATE_CURRENT_FILE', file);
        store.commit('UPDATE_IS_FILE_OPEN', true);
    },
    closeFile() {
        store.commit('UPDATE_IS_FILE_OPEN', false);
    },
    updateIsFileOpen(store, value) {
        store.commit('UPDATE_IS_FILE_OPEN', value);
    },
    deleteFile(store, path) {
        Api.deleteFile(path).then(data => {
            console.log('file removed', data);
            if (data.ok) {
                store.dispatch('getApiFiles');
            }
        });
    },
    getApiFiles() {
        Api.getFiles().then(data => {
            store.commit('UPDATE_FILE_LIST', data.result);
        });
    },
    createFile(store, file) {
        if (!file) return false;
        let filePath = file.files[0].path;
        let fileName = filePath.match(/\/([^/]*)$/)[1];
        Api.createPath(fileName).then(data => {
            if (data.ok) {
                Api.createFile(fileName, filePath).then(data => {
                    if (data.ok) {
                        console.log('file: ', fileName, 'Created');
                    }
                }).catch(err => {
                    console.log('error: ', err);
                });
                setTimeout(() => {
                    store.dispatch('getApiFiles');
                }, 500);
            }
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
    constants
};
