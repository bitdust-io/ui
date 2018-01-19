const Api = require("./src/api.service")
const runBash = require('./node/bash')

class App {

    constructor() {
        this._api = new Api();
    };

    init() {
        this._api.listFiles()
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    };
}

const app = new App();
app.init()