class Api {
    listFiles() {
        return fetch("http://localhost:8180/file/list/v1");
    }
}

module.exports = Api