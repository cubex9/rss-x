'use strict'

const FeedParser = require('feedparser')
const request = require('request')

/**
 * Reader which read the channel by resolver
 * @author kubasekA
 */
class Reader {
    read (channel) {
        console.log('read-feed: ' + channel.rssUri)

        const req = request(channel.rssUri)
        const feedparser = new FeedParser()

        req.on('error', (error) => console.log('Request error:', error))
        req.on('response', (res) => {
            if (res.statusCode !== 200) {
                req.emit('error', new Error('Bad status code'))
            } else {
                req.pipe(feedparser)
            }
        })

        feedparser.on('error', (error) => console.log('Feed error:', error))
        feedparser.on('readable', () => {
            var i

            while ((i = feedparser.read())) {
                channel.resolver.resolve(i)
            }
        })

        return 0
    }
}

module.exports = Reader
