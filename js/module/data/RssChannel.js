const DApi = require('./DApi.js')

/**
 * rss channel description
 *
 * @type {RssChannel}
 */
class RssChannel extends DApi {

    constructor(serialized) {
        super(serialized)

        /**
         * channel id is not numeris, is short name or nick like: 'ettv', 'pyrate-bay', 'kick-ass' ...
         *
         * @type {null}
         */
        this.id = null

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

    get type() {
        return 'channel'
    }
}