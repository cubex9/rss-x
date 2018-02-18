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

        /* the type of data object */
        this.type = 'item'

        this.guid = null

        if (serialized != null) {
            this.guid = serialized.guid
            this.status = serialized.status
            this.movie = serialized.movie
            this.torrent = serialized.torrent
            this.magnet = serialized.magnet
        }
    }

    get id () {
        throw Error('Id must be overriden')
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
