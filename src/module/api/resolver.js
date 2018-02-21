'use strict'

const logger = require('@log4js-node/log4js-api').getLogger('rssx')
const Movie = require('./../data/Movie.js')
/**
 * ResolverApi is general item/movie resolving module api.
 *
 * @author kubasekA
 */
class Resolver {
    constructor ({conf, wac, onInsertMovie, onInsertItem, onError}) {
        this.conf = conf

        this.onInsertMovie = onInsertMovie
        this.onInsertItem = onInsertItem
        this.onError = onError

        // want & catch module
        this.wac = wac
    }

    events ({ onInsertMovie, onInsertItem, onError }) {
        this.onInsertMovie = onInsertMovie
        this.onInsertItem = onInsertItem
        this.onError = onError
    }

    /**
     * Get the resolver name.
     */
    get name () {
        throw new Error('Resolver.name must be override')
    }

    /**
     * Convert item from original rss source to general application type.
     *
     * @param item
     */
    convert (item) {
        throw new Error('Resolver.convert must be override')
    }

    getMovie (t, callback) {
        this.conf.movies(t, callback)
    }

    get db () {
        return this.conf.db
    }

    /**
     * resolve one item from channel
     *
     * @param item
     */
    resolve (item) {
        /* new item */
        var t = this.convert(item)

        /* is in db ? */
        this.db.item.make((b) => {
            b.where('channel', t.channel)
            b.where('guid', t.guid)
            b.callback((e, r) => {
                // when item is new, must be inserted into db
                if (!e && r.length === 0) {
                    this.db.insertItem(t)
                    logger.info('new item: {}', t.guid)

                    // try check movie in db
                    this.db.movie.make((b) => {
                        b.where('origin.Title', t.title)
                        b.where('origin.Year', t.year)

                        b.callback((e, r) => {
                            /* yes, movie exist, set movie to item and update him */
                            if (!e && r.length > 0) {
                                this.resolveExistMovie(t, r[0])
                            } else {
                                this.resolveNewMovie(t)
                            }
                        })
                    })
                }
            })
        })
    }

    /**
     * resolve movie from db
     *
     * @param t item
     * @param r result from db search
     */
    resolveExistMovie (t, r) {
        const m = new Movie(r)
        t.movie = m.id

        this.db.update(t, { movie: m.id })

        // now can call result
        this.onInsertItem(m, t)
    }

    /**
     * get the movie by item from omdb
     * @param t item
     */
    resolveNewMovie (t) {
        logger.info('want new movie: {}', t.title)

        /* movie does not exist, check him from omdb */
        // this.conf.movies(t.title, t.year, (r) => {
        this.wac.want(t, (r) => {
            if (r.Response === 'True' && r.imdbID !== 'undefined') {
                const m = Movie.fromOmdb(r)

                this.db.insertMovie(m)
                this.onInsertMovie(m)

                logger('new movie: {}', m.title)

                return m
            } else {
                return null
            }
        },
        (m) => {
            t.movie = m.id
            this.db.updateItem(t, t)
            this.onInsertItem(m, t)
        })
    }
}

module.exports = Resolver
