const toropa = require('parse-torrent')

module.exports = function (link, callback) {
    // know only the torrents
    if (/^http.*/.test(link)) {
        toropa.remote(link, (e, p) => {
            if (e) {
                console.log('Cannot make magnetico', e)
            } else {
                callback(p)
            }
        })
    }
}
