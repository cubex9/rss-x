const logger = require('@log4js-node/log4js-api').getLogger('rssx')
const toropa = require('parse-torrent')

module.exports = function (link, callback) {
    // know only the torrents
    if (/^http.*/.test(link)) {
        toropa.remote(link, (e, p) => {
            if (e) {
                logger.error('Cannot make magnetico {}', e)
            } else {
                callback(p)
            }
        })
    }
}
