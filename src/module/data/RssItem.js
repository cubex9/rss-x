const DApi = require('./DApi.js')

/**
 * Define RssItem api.
 *
 */
class RssItem extends DApi {
    constructor (serialized) {
        super(serialized)

        this.status = 'new'

        /* local file */
        this.torrent = null

        /* magnetLink */
        this.magnet = null

        /* movie id */
        this.movie = null

        if (serialized != null) {
            this.status = serialized.status
            this.movie = serialized.movie
            this.torrent = serialized.torrent
            this.magnet = serialized.magnet
        }
    }

    get id () {
        throw Error('Id must be overriden')
    }

    get type () {
        return 'item'
    }

    /**
     * Source channel Id
     */
    get channel () {
        throw Error('Channel muse be defined')
    }

    /**
     * torrent title
     */
    get title () {
        throw Error('Title mus be overriden')
    }

    /**
     * movie release
     */
    get year () {
        throw Error('Year mus be overriden')
    }

    /**
     * Size in GB.
     */
    get size () {
        throw Error('Size must be overriden')
    }

    /**
     * Hacker group which anonce this torrent.
     */
    get group () {
    }

    /**
     * url to source torrent
     */
    get link () {
    }
}

module.exports = RssItem
