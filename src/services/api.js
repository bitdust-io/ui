const Api = {
    removeFriend(id) {
        return fetch(this.makeApiEndpoint('friend/remove'), {
            method: 'DELETE',
            body: JSON.stringify({
                'global_id': id
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
        return fetch(this.makeApiEndpoint('user/observe/' + user, 'attempts=4')).then(res => res.json());
    },

    searchUser(user) {
        return fetch(this.makeApiEndpoint('user/search/' + user)).then(res => res.json());
    },

    userList() {
        return fetch(this.makeApiEndpoint('friend/list')).then(res => res.json());
    },

    networkConnected() {
        return fetch(this.makeApiEndpoint('network/connected')).then(res => res.json());
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
        return fetch(this.makeApiEndpoint('identity/get')).then(res => res.json());
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
        return fetch(this.makeApiEndpoint('event/listen/electron')).then(res => res.json());
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
        return fetch(this.makeApiEndpoint('share/list')).then(res => res.json());
    },

    getSharedFiles() {
        return fetch(this.makeApiEndpoint('file/list', 'all_customers=1')).then(res => res.json());
    },

    getFiles() {
        return fetch(this.makeApiEndpoint('file/list')).then(res => res.json());
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

    getPath() {
        return fetch(this.makeApiEndpoint('config/get/paths/restore')).then(res => res.json());
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
    }
};

Api.constants = {
    PORT: '8180',
    API_URL: 'http://localhost',
    API_VERSION: 'v1'
};

export default Api;
