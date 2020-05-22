import api from './api';

const FilesService = {

    async createKey(label) {
        if (!label) {
            const shareKeyData = await api.createFileShareKey();
            if (shareKeyData.status !== 'OK') return false;
            return shareKeyData.result.key_id;
        } else {
            const {result} = await api.createFileShareKey(label);
            console.log('Key was created', result);
            return result;
        }
    },

    async createPathAndUpload({getter, dispatch}, filePath, fileName, keyId) {
        try {
            const response = await api.createPath(fileName, keyId);
            if (response.status !== 'OK') return;
            const {status} = await api.createFile(keyId + ':' + fileName, filePath);
            if (status === 'OK') {
                console.log('file: ', fileName, 'Created');
            }
            setTimeout(() => {
                dispatch('getApiFilesForKey', keyId);
            }, 200);
        } catch (e) {
            console.log('Error trying to create path', e);
        }
    },

    createFile({commit, dispatch, getters}, file, keyId) {
        if (!file) return false;
        let filePath = file.files[0].path.replace(/\\/g, '/');
        let fileName = filePath.match(/\/([^/]*)$/)[1];
        // TODO Sanitize file name

        if (getters.hasFilePath(fileName).length === 0) {
            if (!keyId) {
                return api.createFileShareKey().then(shareKeyData => {
                    if (!shareKeyData.result && shareKeyData.status !== 'OK') return false;
                    const keyId = shareKeyData.result[0].key_id;
                    this.createPathAndUpload({commit, dispatch, getters}, filePath, fileName, keyId);
                });
            } else {
                return this.createPathAndUpload({commit, dispatch, getters}, filePath, fileName, keyId);
            }
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

export default FilesService;
