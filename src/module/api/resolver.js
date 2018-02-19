'use strict'

const Movie = require('./../data/Movie.js')
/**
 * ResolverApi is general item/movie resolving module api.
 *
 * @author kubasekA
 */
class Resolver {
    constructor ({ conf, onInsertMovie, onInsertItem, onError }) {
        this.conf = conf

        this.onInsertMovie = onInsertMovie
        this.onInsertItem = onInsertItem
        this.onError = onError
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
                    console.log('new item:', t)

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
        console.log('New movie:', t)

        /* movie does not exist, check him from omdb */
        this.conf.movies(t.title, t.year, (r) => {
            if (r.Response && r.imdbID !== 'undefined') {
                const m = Movie.fromOmdb(r)

                t.movie = m.id
                this.db.update(t, { movie: m.id })

                /* film vkladame pouze pokud opravdu v db nebyl */
                this.db.movie.search('guid', m.id).callback((err, res) => {
                    if (err) {
                        console.log('movie search error:', err)
                    } else if (res.length === 0) {
                        this.db.insertMovie(m)
                        this.onInsertMovie(m)
                    }
                    this.onInsertItem(m, t)
                })
            }
        })
    }
}

module.exports = Resolver
