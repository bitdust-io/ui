const Api = {

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

    getFiles() {
        return fetch(this.makeApiEndpoint('file/list')).then(res => res.json());
    },

    createPath(pathName) {
        return fetch(this.makeApiEndpoint('file/create'), {
            method: 'POST',
            body: JSON.stringify({'remote_path': pathName})
        }).then(res => res.json());
    },

    createFile(fileName, filePath) {
        return fetch(this.makeApiEndpoint('file/upload/start'), {
            method: 'POST',
            body: JSON.stringify({
                'remote_path': fileName,
                'local_path': filePath
            })
        }).then(res => res.json());
    },

    deleteFile(filePath) {
        return fetch(this.makeApiEndpoint('file/delete'), {
            method: 'delete',
            body: JSON.stringify({
                'remote_path': filePath
            })
        });
    },

    downloadFile(filePath) {
        return this.getPath().then(response => {
            return fetch(this.makeApiEndpoint('file/download/start'), {
                method: 'POST',
                body: JSON.stringify({
                    'remote_path': filePath,
                    'destination_folder': response.value
                })
            });
        });
    },

    getPath() {
        return fetch(this.makeApiEndpoint('config/get/paths/restore'), {
            method: 'GET'
        });
    },

    setPath(filePath) {
        return fetch(this.makeApiEndpoint('config/set/paths/restore'), {
            method: 'POST',
            body: JSON.stringify({
                'value': filePath
            })
        });
    },

    makeApiEndpoint(service) {
        if (!service) return;
        return this.constants.API_URL + ':' + this.constants.PORT + '/' + service + '/' + this.constants.API_VERSION;
    }
};

Api.constants = {
    PORT: '8180',
    API_URL: 'http://localhost',
    API_VERSION: 'v1'
};

export default Api;
