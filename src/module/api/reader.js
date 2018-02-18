'use strict'

const FeedParser = require('feedparser')
const request = require('request')

/**
 * Reader which read the channel by resolver
 * @author kubasekA
 */
class Reader {
    read (channel) {
        // pirates: https://thepiratebay.org/rss//top100/200
        // https://thepiratebay.org/rss//top100/500
        console.log('Start feed: ' + channel.rssUri)

        const req = request(channel.rssUri)
        const feedparser = new FeedParser()

        // req.on('error', (error) => {
        //     // handle any request errors
        // })

        req.on('response', (res) => {
            // var stream = this // `this` is `req`, which is a stream

            if (res.statusCode !== 200) {
                req.emit('error', new Error('Bad status code'))
            } else {
                req.pipe(feedparser)
            }
        })

        // feedparser.on('error', (error) => {
        //     // always handle errors
        // })

        feedparser.on('readable', () => {
            // This is where the action is!
            var i

            while ((i = feedparser.read())) {
                channel.resolver.resolve(i)
            }
        })
    }
}

module.exports = Reader
