var ptn = require('parse-torrent-name')

RssItem = function RssItem(chan, item) {

    /**
     * id of rss channel
     */
    this.channelId = channel;

    /**
     * id of item
     *
     * @type {*|number}
     */
    this.id = item.guid;

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
    this.parsed = ptn(item.title)

    /**
     * data from rss
     */
    this.rss = item;

    /**
     * parsed size
     *
     * @type {RssSize}
     */
    this.size = new RssSize( item.summary );

    /**
     * path to local file, if was downloaded
     */
    this.torrent;


    /**
     * if torrent not downloaded, will be, and will have saved to local disk
     *
     * @return data of torrent file in Json
     */
    this.getTorrent = function() {

    }

    /**
     * return magnet link ( URI )
     */
    this.insertMagnet = function(html) {

        magnet(o.imdbID,item.guid,item.link,color);
    }

}