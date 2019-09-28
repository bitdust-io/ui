const Api = {

    getMessageHistoryForUser(user) {
        let query = 'id=' + user.global_id;
        return this.makeGet('message/history', query);
    },

    getKey(includePrivate, globalID) {
        const query = 'include_private=' + includePrivate + '&key_id=master';
        return this.makeGet('key/get', query);
    },

    getConfigKeys() {
        return this.makeGet('key/list');
    },

    getDonated() {
        return this.makeGet('space/donated');
    },

    getCustomers() {
        return this.makeGet('customer/list');
    },

    getSuppliers() {
        return this.makeGet('supplier/list');
    },

    restartProcess() {
        return this.makeGet('process/restart');
    },

    replaceSupplier(supplier) {
        return this.makeDelete('supplier/replace', {
            'position': supplier.position
        });
    },

    removeFriend(id) {
        return this.makeDelete('friend/remove', {
            'global_id': id
        });
    },

    async identityBackup() {
        let {result} = await this.getPath();
        return this.makePost('identity/backup', {
            'destination_path': result[0].value + 'bitdust-private-key.txt'
        });
    },

    addFriend(id) {
        return this.makePost('friend/add', {
            'idurl': id
        });
    },

    observeUser(user) {
        return this.makeGet('user/observe/' + user, 'attempts=4');
    },

    searchUser(user) {
        return this.makeGet('user/search/' + user);
    },

    userList() {
        return this.makeGet('friend/list');
    },

    processHealth() {
        return this.makeGet('process/health');
    },

    networkConnected() {
        return this.makeGet('network/connected');
    },

    serviceStop(serviceId) {
        return this.makePost('service/stop' + serviceId);
    },

    serviceStart(serviceId) {
        return this.makePost('service/start' + serviceId);
    },

    recoverIdentityFile(file) {
        return this.makePost('identity/recover', {
            'private_key_local_file': file
        });
    },

    recoverIdentityKey(key) {
        return this.makePost('identity/recover', {
            'private_key_source': key
        });
    },

    createIdentity(username) {
        return this.makePost('identity/create', {
            'username': username
        });
    },

    getIdentity() {
        return this.makeGet('identity/get');
    },

    getUser() {
        return this.makeGet('config/get/personal/nickname');
    },

    eventsSend(eventId) {
        return this.makePost('event/send' + eventId, {
            'request': 'hello'
        });
    },

    eventsListen() {
        return this.makeGet('event/listen/electron');
    },

    shareFile(file, friend) {
        return this.makePut('share/grant', {
            'trusted_global_id': friend.global_id,
            'key_id': file.key_id
        });
    },

    createFileShareKey(label) {
        return this.makePost('share/create', {
            'label': label || ''
        });
    },

    removeFileShareKey(id) {
        return this.makeDelete('key/delete', {
            'key_id': id
        });
    },

    getShareList(config) {
        return this.makeGet('share/list', config);
    },

    getAllShareList() {
        return this.makeGet('share/list');
    },

    getKeyList() {
        return this.makeGet('key/list');
    },

    editKeyLabel(id, label) {
        return this.makePost('key/label', {
            'key_id': id,
            'label': label
        });
    },

    getSharedFiles() {
        return this.makeGet('file/list', 'all_customers=1');
    },

    getFiles() {
        return this.makeGet('file/list');
    },

    getFilesForKey(key, isShare = 1) {
        let query = ['key_id=' + key, 'all_customers=' + isShare];
        return this.makeGet('file/list', query.join('&'));
    },

    getFileInfo(file) {
        let query = 'remote_path=' + file.key_id + ':' + file.path;
        return this.makeGet('file/info', query);
    },

    createPath(pathName, keyId) {
        return this.makePost('file/create', {
            'remote_path': keyId + ':' + pathName
        });
    },

    createFile(remotePath, filePath) {
        return this.makePost('file/upload/start', {
            'remote_path': remotePath,
            'local_path': filePath
        });
    },

    deleteFile(remotePath) {
        return this.makeDelete('file/delete', {
            'remote_path': remotePath
        });
    },

    getDownloads() {
        return this.makeGet('file/download');
    },

    getUploads() {
        return this.makeGet('file/upload');
    },

    downloadFile(filePath) {
        return this.makePost('file/download/start', {
            'remote_path': filePath
        });
    },

    getConfigList() {
        return this.makeGet('config/list');
    },

    getServiceList() {
        return this.makeGet('service/list', 'config=1');
    },

    setConfig(config) {
        return this.makePost('config/set', {
            key: config.key,
            value: config.value
        });
    },

    getPath() {
        return this.makeGet('config/get/paths/restore');
    },

    setPath(filePath) {
        return this.makePost('config/set/paths/restore', {
            'value': filePath
        });
    },

    makeApiEndpoint(service, params) {
        if (!service) return;
        if (params) {
            return this.constants.API_URL + ':' + this.constants.PORT + '/' + service + '/' + this.constants.API_VERSION + '?' + params;
        }
        return this.constants.API_URL + ':' + this.constants.PORT + '/' + service + '/' + this.constants.API_VERSION;
    },

    makePut(config, body) {
        return fetch(this.makeApiEndpoint(config), {
            method: 'PUT',
            body: JSON.stringify(body)
        }).then(res => res.json());
    },

    makeDelete(config, body) {
        return fetch(this.makeApiEndpoint(config), {
            method: 'DELETE',
            body: JSON.stringify(body)
        }).then(res => res.json());
    },

    makePost(config, body) {
        return fetch(this.makeApiEndpoint(config), {
            method: 'POST',
            body: JSON.stringify(body)
        }).then(res => res.json());
    },

    makeGet(config, query) {
        return fetch(this.makeApiEndpoint(config, query)).then(res => res.json());
    }
};

Api.constants = {
    PORT: '8180',
    API_URL: 'http://localhost',
    API_VERSION: 'v1'
};

export default Api;
