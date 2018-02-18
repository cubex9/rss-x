// {
//     author:"makintos13"
//     categories:Array(1)
//     comments:"http://thepiratebay.org/torrent/19755339"
//     computed:RssSummary
//     date:Sun Jan 21 2018 02:14:43 GMT+0100 (Central Europe Standard Time)
//     dc:creator:Object
//     description:null
//     enclosures:Array(0)
//     guid:"http://thepiratebay.org/torrent/19755339/"
//     image:Object
//     link:"magnet:?xt=urn:btih:9581B8C8FF8DC070E672BB56FE0AC9908789DC39&dn=Thor.Ragnarok.2017.1080p.WEB-DL.X264.AC3-EVO"
//     meta:Object
//     origlink:null
//     permalink:"http://thepiratebay.org/torrent/19755339/"
//     ptn:Object
//     pubDate:Sun Jan 21 2018 02:14:43 GMT+0100 (Central Europe Standard Time)
//     pubdate:Sun Jan 21 2018 02:14:43 GMT+0100 (Central Europe Standard Time)
//     source:Object
//     summary:null
//     title:"Thor.Ragnarok.2017.1080p.WEB-DL.X264.AC3-EVO"
//
// }

const RssItem = require('./RssItem.js')
const ptn = require('parse-torrent-name')

/**
 * PyrateBay Rss item
 *
 */
class PirateItem extends RssItem {
    constructor (serialized) {
        super(serialized)

        /* rss source */
        this.rss = null

        /* parsed-torrent-name */
        this.parsed = null

        /* computed size in GB */
        this.csize = null

        /* channel */
        this.channel = 'pirate'

        if (serialized != null) {
            this.guid = serialized.guid
            this.rss = serialized.rss
            this.parsed = serialized.parsed
            this.csize = serialized.size
        }
    }

    static fromRss (val) {
        const i = new PirateItem(null)
        i.rss = val

        /* http://thepiratebay.org/torrent/19755339/ */
        i.guid = /^http.*\/(\d+)\/$/gi.exec(val.guid)[1]
        i.parsed = ptn(val.title)
        i.csize = 0
        i.magnet = val.link

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

module.exports = PirateItem
