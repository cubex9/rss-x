const fs = require('fs')

module.exports = {
    read: function (path, callback) {
        fs.readFile(path, 'utf8', (e, data) => {
            if (e) throw e
            callback(data)
        })
    },

    write: function (path, data) {
        fs.writeFile(path, data, (e) => {
            if (e) throw e
        })
    },

    inStream: (path) => {
        return fs.createReadStream(path)
    },

    outStream: (path) => {
        return fs.createWriteStream(path)
    }
}
