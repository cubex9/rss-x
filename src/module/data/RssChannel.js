const DApi = require('./DApi.js')

/**
 * rss channel description
 *
 * @type {RssChannel}
 */
class RssChannel extends DApi {
    constructor (serialized) {
        super(serialized)

        /**
         * channel id is not numeris, is short name or nick like: 'ettv', 'pyrate-bay', 'kick-ass' ...
         *
         * @type {null}
         */
        this.channelId = null

        /**
         * type of entity is
         */
        this.type = 'channel'

        /**
         * uri for dowload new items
         */
        this.rssUri = null

        /**
         * html page of channel
         */
        this.web = null

        /**
         * last update, it is mean: when we read last time
         */
        this.update = null

        /**
         * channel name
         */
        this.name = null

        /**
         * search in channel rss provider
         */
        this.search = null

        /**
         * resolver
         */
        this.resolver = null

        if (serialized != null) {
            this.channelId = serialized.channelId
            this.rssUri = serialized.rssUri
            this.web = serialized.web
            this.update = serialized.update
            this.name = serialized.name

            /* plug-ins */
            this.resolver = serialized.resolver
            this.search = serialized.search
        }
    }

    get id () {
        return this.channelId
    }
}

module.exports = RssChannel
