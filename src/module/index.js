const logger = require('@log4js-node/log4js-api').getLogger('rssx')

// module inner depndences
const Conf = require('./RssXConf.js')
const De = require('./data/Convertors.js')
const Reader = require('./api/reader.js')
const RssChannel = require('./data/RssChannel.js')
const PirateResolver = require('./pirate-resolver.js')
const EttvResolver = require('./ettv-resolver.js')
const WantAndCath = require('./api/want2catch.js')
const MagnetInfo = require('./magnet-tracker.js')
const Renderer = require('./html-renderer.js')

// static constants
const __conf = new Conf()
const __channels = [
    {
        type: 'pirate',
        rssUri: 'https://thepiratebay.org/rss//top100/200',
        web: 'https://thepiratebay.org',
        name: 'Movies top100',
        resolver: null // new PirateResolver(mapping)
    },
    {
        type: 'ettv',
        rssUri: 'https://www.ettv.tv/rss.php?cat=1,2,3,42,47,49',
        web: 'https://www.ettv.tv',
        name: 'Ettv movies',
        resolver: null // new EttvResolver(mapping)
    }
]

module.exports = {
    /**
     * Runn application.
     * @param {|RssXConf} configuration object
     */
    run: function () {
        // easy html renderer
        __conf.renderer = new Renderer('#rss')

        new MagnetInfo(__conf).infoof('nic', (e, r) => console.log(r))

        // read movies from db
        __conf.db.movie.make((b) => b.callback((err, r) => {
            if (err) {
                logger.error('Read movies from db: ', err)
            } else {
                logger.info('DB-READER-MOVIES-{}-FROM-DB', r.length)
                r.map((m) => {
                    const movie = De.deserialize(m)
                    __conf.renderer.add(movie)
                    __conf.db.itemsOfMovie(movie, (i) => __conf.renderer.update(movie, i))
                })
            }
        }))

        // maping
        const mapping = {
            conf: __conf,
            wac: new WantAndCath((t) => t.title, __conf.movies),
            onInsertMovie: (m) => __conf.renderer.add(m),
            onInsertItem: (m, i) => __conf.renderer.update(m, i),
            onError: (e) => __conf.renderer.error(e)
        }

        // add some channels
        const channels = [
            {
                channelId: '1',
                rssUri: 'https://thepiratebay.org/rss//top100/200',
                web: 'https://thepiratebay.org',
                name: 'pirate',
                resolver: new PirateResolver(mapping)
            },
            {
                channelId: '2',
                rssUri: 'https://www.ettv.tv/rss.php?cat=1,2,3,42,47,49',
                web: 'https://www.ettv.tv',
                name: 'ettv',
                resolver: new EttvResolver(mapping)
            }
        ]

        // go over chanel updates
        channels.map((ch) => new Reader().read(new RssChannel(ch)))
    },
    channels: function () {
        return __channels
    },
    conf: function () {
        return __conf
    }
}
