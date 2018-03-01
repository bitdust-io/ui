const Api = {

    networkConnected() {
        return fetch('http://localhost:8180/network/connected/v1')
            .then(res => res.json());
    },

    serviceStop(serviceId) {
        return fetch('http://localhost:8180/service/stop/' + serviceId + '/v1', {
            method: 'POST'
        }).then(res => res.json());
    },

    serviceStart(serviceId) {
        return fetch('http://localhost:8180/service/start/' + serviceId + '/v1', {
            method: 'POST'
        }).then(res => res.json());
    },

    recoverIdentityFile(file) {
        return fetch('http://localhost:8180/identity/recover/v1', {
            method: 'POST',
            body: JSON.stringify({
                'private_key_local_file': file
            })
        }).then(res => res.json());
    },

    recoverIdentityKey(key) {
        return fetch('http://localhost:8180/identity/recover/v1', {
            method: 'POST',
            body: JSON.stringify({
                'private_key_source': key
            })
        }).then(res => res.json());
    },

    createIdentity(username) {
        return fetch('http://localhost:8180/identity/create/v1', {
            method: 'POST',
            body: JSON.stringify({'username': username})
        }).then(res => res.json());
    },

    getIdentity() {
        return fetch('http://localhost:8180/identity/get/v1').then(res => res.json());
    },

    eventsSend(eventId) {
        return fetch('http://localhost:8180/event/send/' + eventId + '/v1', {
            method: 'POST',
            body: JSON.stringify({
                'request': 'hello'
            })
        }).then(res => res.json());
    },

    eventsListen() {
        return fetch('http://localhost:8180/event/listen/electron/v1').then(res => res.json());
    },

    getFiles() {
        return fetch('http://localhost:8180/file/list/v1').then(res => res.json());
    },

    createPath(pathName) {
        return fetch('http://localhost:8180/file/create/v1', {
            method: 'POST',
            body: JSON.stringify({'remote_path': pathName})
        }).then(res => res.json());
    },

    createFile(fileName, filePath) {
        return fetch('http://localhost:8180/file/upload/start/v1', {
            method: 'POST',
            body: JSON.stringify({
                'remote_path': fileName,
                'local_path': filePath
            })
        }).then(res => res.json());
    },

    deleteFile(filePath) {
        return fetch('http://localhost:8180/file/delete/v1', {
            method: 'delete',
            body: JSON.stringify({
                'remote_path': filePath
            })
        });
    },

    downloadFile(filePath) {
        return fetch('http://localhost:8180/file/download/start/v1', {
            method: 'POST',
            body: JSON.stringify({
                'remote_path': filePath,
                'destination_folder': '~/Users/renatocardoso/repos/bitDust-web/'
            })
        });
    }
};

export default Api;
