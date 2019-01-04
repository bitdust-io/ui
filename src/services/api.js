const Api = {

    getMessageHistoryForUser(user) {
        let query = 'id=' + user.global_id;
        return this.makeGet('message/history', query);
    },

    getKeys() {
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

    createFileShareKey() {
        return this.makePost('share/create');
    },

    getSharedKeys() {
        return this.makeGet('share/list');
    },

    getSharedFiles() {
        return this.makeGet('file/list', 'all_customers=1');
    },

    getFiles() {
        return this.makeGet('file/list');
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

    downloadFile(filePath) {
        return this.makePost('file/download/start', {
            'remote_path': filePath
        });
    },

    async getPath() {
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
