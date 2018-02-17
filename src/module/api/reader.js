'use strict'

const FeedParser = require('feedparser')
const request = require('request')

/**
 * Reader which read the channel by resolver
 * @author kubasekA
 */
class Reader {
    constructor ({conf, resolver}) {
        this.resolver = resolver
    }

    read (channel) {
        // pirates: https://thepiratebay.org/rss//top100/200
        // https://thepiratebay.org/rss//top100/500
        const req = request(channel.rssUri)
        var feedparser = new FeedParser()

        // req.on('error', (error) => {
        //     // handle any request errors
        // })

        req.on('response', (res) => {
            var stream = this // `this` is `req`, which is a stream

            if (res.statusCode !== 200) {
                stream.emit('error', new Error('Bad status code'))
            } else {
                stream.pipe(feedparser)
            }
        })

        // feedparser.on('error', (error) => {
        //     // always handle errors
        // })

        feedparser.on('readable', () => {
            // This is where the action is!
            const stream = this // `this` is `feedparser`, which is a stream
            var i

            while ((i = stream.read())) {
                this.resolver.resolve(i)
            }
        })
    }
}

module.export = Reader
