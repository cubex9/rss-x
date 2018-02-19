const toropa = require('parse-torrent')

module.exports = function (link, callback) {
    toropa.remote(link, (e, p) => {
        if (e) {
            throw e
        } else {
            console.log('magnetron:', p)
            callback(p)
            // window.$('#' + id + ' .movie-downloads').append(
            //     `<a href="${toropa.toMagnetURI(p)}" class="movie-link" id="${itemId}">
            //         <img src="pic/download.png" width="24pt" />
            //      </a>`
            // )

            // window.$('#' + itemId).css('background-color', color)
        }
    })
}
