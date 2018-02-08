var ptn = require('parse-torrent-name')

RssItem = function RssItem(serialized) {

    /**
     * id of item
     *
     * @type {*|number}
     */
    this.id = null;

    /**
     * data from rss
     */
    this.origin;

    /**
     * id of rss channel
     */
    this.channelId;

    /**
     * movie id
     */
    this.movieId;

    /**
     * status can be: new, deleted
     *
     * @type {string}
     */
    this.status = 'new';

    /**
     * parsed informations
     */
    this.parsed;

    /**
     * parsed size
     *
     * @type {RssSize}
     */
    this.size;

    /**
     * path to local file, if was downloaded
     */
    this.torrent;

    if( serialized != null ) {

        this.id = serialized.id;
        this.origin = serialized.origin;
        this.channel = serialized.channel;
        this.movieId = serialized.movieId;

        this.parsed = serialized.parsed;
        this.size = new RssSize(serialized.size);

        this.status = serialized.status;
    }

    this.set = function( channel, origin ) {

        this.id = origin.guid;
        this.origin = origin;
        this.channel = channel;

        this.parsed = ptn( origin.summary );
        this.size = new RssSize( origin.summary );

        return this;
    }

    this.setMovie = function( movie ) {
        this.movieId = movie.id;

        return this;
    }


    /**
     * if torrent not downloaded, will be, and will have saved to local disk
     *
     * <pre>
     *     getTorrent( t => {
     *          $('#torrentId').html( JSON.toString(t) );
     *     })
     * </pre>
     * @return data of torrent file in Json
     */
    this.getTorrent = function( onSuccess ) {

        /* not downloaded yet */
        if( this.torrent != null ) {

        } else {
            var t = file.read(__directory, this.torrent);
            onSuccess(t)
        }

    }

    /**
     * return magnet link ( URI )
     */
    this.insertMagnet = function(html) {

        magnet(o.imdbID,item.guid,item.link,color);
    }

}