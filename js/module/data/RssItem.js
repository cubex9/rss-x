const DApi = require('./DApi.js')

/**
 * Define RssItem api.
 *
 */
class RssItem extends DApi {

    constructor(serialized) {
        super(serialized)

        this.status = 'new';

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

    get id() {
        throw Error("Id must be overriden")
    }

    get type() {
        return 'item'
    }

    /**
     * Source channel Id
     */
    get channel() {
        throw Error("Channel muse be defined")
    }

    /**
     * komplete name of item
     */
    get summary() {
    }

    get title() {
        throw Error("Title mus be overriden")
    }

    get year() {
        throw Error("Year mus be overriden")
    }

    /**
     * Size in GB.
     */
    get size() {
        throw Error("Size must be overriden")
    }

    /**
     * Hacker group which anonce this torrent.
     */
    get group() {
    }

    /**
     * url to source torrent
     */
    get link() {
    }

}

module.exports = EttvItem



//
//
//
//
//     /**
//      * id of item
//      *
//      * @type {*|number}
//      */
//     this.id = null;
//
//     /**
//      * data from rss
//      */
//     this.origin;
//
//     /**
//      * id of rss channel
//      */
//     this.channelId;
//
//     /**
//      * movie id
//      */
//     this.movieId;
//
//     /**
//      * status can be: new, deleted
//      *
//      * @type {string}
//      */
//     this.status = 'new';
//
//     /**
//      * parsed informations
//      */
//     this.parsed;
//
//     /**
//      * parsed size
//      *
//      * @type {RssSize}
//      */
//     this.size;
//
//     /**
//      * path to local file, if was downloaded
//      */
//     this.torrent;
//
//     if( serialized != null ) {
//
//         this.id = serialized.id;
//         this.origin = serialized.origin;
//         this.channel = serialized.channel;
//         this.movieId = serialized.movieId;
//
//         this.parsed = serialized.parsed;
//         this.size = new RssSize(serialized.size);
//
//         this.status = serialized.status;
//     }
//
//     this.set = function( channel, origin ) {
//
//         this.id = origin.guid;
//         this.origin = origin;
//         this.channel = channel;
//
//         this.parsed = ptn( origin.summary );
//         this.size = new RssSize( origin.summary );
//
//         return this;
//     }
//
//
//     get movie() {
//     return movie.id
//     }
// }
//     this.setMovie = function( movie ) {
//         this.movieId = movie.id;
//
//         return this;
//     }
//
//
//
//
//     /**
//      * if torrent not downloaded, will be, and will have saved to local disk
//      *
//      * <pre>
//      *     getTorrent( t => {
//      *          $('#torrentId').html( JSON.toString(t) );
//      *     })
//      * </pre>
//      * @return data of torrent file in Json
//      */
//     this.getTorrent = function( onSuccess ) {
//
//         /* not downloaded yet */
//         if( this.torrent != null ) {
//
//         } else {
//             var t = file.read(__directory, this.torrent);
//             onSuccess(t)
//         }
//
//     }
//
//     /**
//      * return magnet link ( URI )
//      */
//     this.insertMagnet = function(html) {
//
//         magnet(o.imdbID,item.guid,item.link,color);
//     }
//
// }