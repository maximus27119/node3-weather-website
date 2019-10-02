const fs = require('fs');

const isDataExists = (path) => {
    return fs.existsSync(path);
}

const saveData = (path, data) => {
    fs.writeFileSync(path, data);
}

const createDirectory = (path) => {
    fs.mkdirSync(path);
}

const loadData = (path) => {
    return fs.readFileSync(path);
}

module.exports = {
    isDataExists,
    saveData,
    createDirectory,
    loadData
}