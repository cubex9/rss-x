/**
 * rss channel description
 *
 * @type {RssChannel}
 */
RssChannel = new function RssChannel(serialized) {

    /**
     * id of channel, it's application own property
     */
    this.id;

    /**
     * uri for dowload new items
     */
    this.rssUri;

    /**
     * html page of channel
     */
    this.web;

    /**
     * last update, it is mean: when we read last time
     */
    this.update;

    /**
     * channel name
     */
    this.name;

    /**
     * search in channel rss provider
     */
    this.search;

    /**
     * reader
     */
    this.reader;


    if( serialized != null ) {

        this.id = serialized.id;
        this.rssUri = serialized.rssUri;
        this.web = serialized.web;
        this.update = serialized.update;
        this.name = serialized.name;

        /* plug-ins */
        this.reader = serialized.reader;
        this.search = serialized.search;
    }
}