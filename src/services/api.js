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
        return fetch(this.makeApiEndpoint('supplier/replace'), {
            method: 'DELETE',
            body: JSON.stringify({
                'position': supplier.position
            })
        }).then(res => res.json());
    },

    removeFriend(id) {
        return fetch(this.makeApiEndpoint('friend/remove'), {
            method: 'DELETE',
            body: JSON.stringify({
                'global_id': id
            })
        }).then(res => res.json());
    },

    async identityBackup() {
        let {result} = await this.getPath();
        return fetch(this.makeApiEndpoint('identity/backup'), {
            method: 'POST',
            body: JSON.stringify({
                'destination_path': result[0].value + 'bitdust-private-key.txt'
            })
        }).then(res => res.json());
    },

    addFriend(id) {
        return fetch(this.makeApiEndpoint('friend/add'), {
            method: 'POST',
            body: JSON.stringify({
                'idurl': id
            })
        }).then(res => res.json());
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
        return fetch(this.makeApiEndpoint('service/stop' + serviceId), {
            method: 'POST'
        }).then(res => res.json());
    },

    serviceStart(serviceId) {
        return fetch(this.makeApiEndpoint('service/start' + serviceId), {
            method: 'POST'
        }).then(res => res.json());
    },

    recoverIdentityFile(file) {
        return fetch(this.makeApiEndpoint('identity/recover'), {
            method: 'POST',
            body: JSON.stringify({
                'private_key_local_file': file
            })
        }).then(res => res.json());
    },

    recoverIdentityKey(key) {
        return fetch(this.makeApiEndpoint('identity/recover'), {
            method: 'POST',
            body: JSON.stringify({
                'private_key_source': key
            })
        }).then(res => res.json());
    },

    createIdentity(username) {
        return fetch(this.makeApiEndpoint('identity/create'), {
            method: 'POST',
            body: JSON.stringify({'username': username})
        }).then(res => res.json());
    },

    getIdentity() {
        return this.makeGet('identity/get');
    },

    eventsSend(eventId) {
        return fetch(this.makeApiEndpoint('event/send' + eventId), {
            method: 'POST',
            body: JSON.stringify({
                'request': 'hello'
            })
        }).then(res => res.json());
    },

    eventsListen() {
        return this.makeGet('event/listen/electron');
    },

    shareFile(file, friend) {
        return fetch(this.makeApiEndpoint('share/grant'), {
            method: 'PUT',
            body: JSON.stringify(
                {
                    'trusted_global_id': friend.global_id,
                    'key_id': file.key_id
                }
            )
        }).then(res => res.json());
    },

    createFileShareKey() {
        return fetch(this.makeApiEndpoint('share/create'), {
            method: 'POST'
        }).then(res => res.json());
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
        return fetch(this.makeApiEndpoint('file/info', query)
        ).then(res => res.json());
    },

    createPath(pathName, keyId) {
        return fetch(this.makeApiEndpoint('file/create'), {
            method: 'POST',
            body: JSON.stringify(
                {'remote_path': keyId + ':' + pathName}
            )
        }).then(res => res.json());
    },

    createFile(remotePath, filePath) {
        return fetch(this.makeApiEndpoint('file/upload/start'), {
            method: 'POST',
            body: JSON.stringify({
                'remote_path': remotePath,
                'local_path': filePath
            })
        }).then(res => res.json());
    },

    deleteFile(remotePath) {
        return fetch(this.makeApiEndpoint('file/delete'), {
            method: 'delete',
            body: JSON.stringify({
                'remote_path': remotePath
            })
        });
    },

    downloadFile(filePath) {
        return this.getPath().then(response => {
            return fetch(this.makeApiEndpoint('file/download/start'), {
                method: 'POST',
                body: JSON.stringify({
                    'remote_path': filePath
                })
            });
        });
    },

    async getPath() {
        return this.makeGet('config/get/paths/restore');
    },

    setPath(filePath) {
        return fetch(this.makeApiEndpoint('config/set/paths/restore'), {
            method: 'POST',
            body: JSON.stringify({
                'value': filePath
            })
        }).then(res => res.json());
    },

    makeApiEndpoint(service, params) {
        if (!service) return;
        if (params) {
            return this.constants.API_URL + ':' + this.constants.PORT + '/' + service + '/' + this.constants.API_VERSION + '?' + params;
        }
        return this.constants.API_URL + ':' + this.constants.PORT + '/' + service + '/' + this.constants.API_VERSION;
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
