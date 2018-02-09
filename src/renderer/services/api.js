const Api = {

    eventsListen() {
        return fetch('http://localhost:8180/event/listen/electron/v1').then(res => res.json());
    },

    listFiles() {
        return fetch('http://localhost:8180/file/list/v1').then(res => res.json());
    },

    createPath(pathName) {
        return fetch('http://localhost:8180/file/create/v1', {
            method: 'POST',
            body: JSON.stringify({'remote_path': pathName})
        });
    },

    createFile(fileName, filePath) {
        return fetch('http://localhost:8180/file/upload/start/v1', {
            method: 'POST',
            body: JSON.stringify({
                'remote_path': fileName,
                'local_path': filePath
            })
        });
    },

    deleteFile(filePath) {
        return fetch('http://localhost:8180/file/delete/v1', {
            method: 'delete',
            body: JSON.stringify({
                'remote_path': filePath
            })
        });
    }
};

export default Api;
