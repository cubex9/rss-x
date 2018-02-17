const toropa = require('parse-torrent')

module.exports = function (id, itemId, link, color) {
    toropa.remote(link, (e, p) => {
        if (e) {
            throw e
        } else {
            console.log(p.name)

            window.$('#' + id + ' .movie-downloads').append(
                `<a href="${toropa.toMagnetURI(p)}" class="movie-link" id="${itemId}">
                    <img src="pic/download.png" width="24pt" />
                 </a>`
            )

            window.$('#' + itemId).css('background-color', color)
        }
    })
}
