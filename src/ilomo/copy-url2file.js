const http = require('http')
const fs = require('fs')

module.exports = {
    copyTo: function (src, dst) {
        try {
            var file = fs.createWriteStream(dst)
            http.get(src, function (response) {
                response.pipe(file)
            })
        } catch (e) {
            throw e
        }
    }
}
