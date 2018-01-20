const Api = require("./src/api.service");
const runBash = require('./node/bash');

class App {

    constructor() {
        this._api = new Api();
        this._filePath = undefined;
        this._fileList = document.getElementById("fileList");
        this._alertFileContainer = document.getElementById("alertFile");
    };

    init() {
        this._buildFileList();

        //Set listener for file input
        document.getElementById("fileUpload").onchange = (fileData) => {
            this._filePath = URL.createObjectURL(fileData.target.files[0]);
        };

    };


    _render(template, options) {
        return template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, variable) => {
            return options[variable] || '';
        })
    }

    _alertFile(fileData) {
        this._alertFileContainer.innerHTML = 'File: ' + fileData + ' was successfully deleted';
        this._alertFileContainer.classList.add('show-alert')
    }


    deleteFile(filePath) {
        this._api.deleteFile(filePath).then(data => {
            console.log(data);
            this._alertFile(filePath);
        });
    }


    _buildFileItem(itemData) {
        const item = this._render('<li><span class="fileDelete" onclick="app.deleteFile(\'{{ fileName }}\')">x</span> {{ fileName }}</li>', {
            fileName: itemData.name
        });
        this._fileList.insertAdjacentHTML('beforeend', item);
    }

    _buildFileList() {
        this._fileList.innerHTML = "";
        this._api.listFiles()
            .then(res => res.json())
            .then(res => {
                res.result.forEach(data => {
                    this._buildFileItem(data);
                });
            });
    }

    createFile() {
        const fileName = document.getElementById("fileUpload").value.replace(/C:\\fakepath\\/i, '');
        this._api.createPath(fileName).then(data => {
            if (data.ok) {
                this._api.createFile(fileName, this._filePath).then(data => {
                    if (data.ok) {
                        console.log('file: ', fileName, 'Created');
                        this._buildFileList();
                    }
                });
            }
        });
    }

}

const app = new App();

app.init();
