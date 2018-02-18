const RssItem = require('./RssItem.js')
const ptn = require('parse-torrent-name')
const rssSize = require('./../rss-size.js')

class EttvItem extends RssItem {
    constructor (serialized) {
        super(serialized)

        this.rss = null

        this.parsed = null

        /* computed size in GB */
        this.csize = null

        /* owner channel */
        this.channel = 'ettv'

        if (serialized != null) {
            this.rss = serialized.rss
            this.parsed = serialized.parsed
            this.csize = serialized.size
        }
    }

    static fromRss (val) {
        const i = new EttvItem(null)
        i.rss = val
        i.guid = val.guid

        i.parsed = ptn(val.title)
        i.csize = rssSize(val.summary)

        return i
    }

    get id () {
        return this.channel + '.' + this.guid
    }

    get title () {
        return this.parsed.title
    }

    get year () {
        return this.parsed.year
    }

    get group () {
        return this.parsed.group
    }

    get link () {
        return this.rss.link
    }

    get size () {
        return this.csize
    }
}

module.exports = EttvItem
