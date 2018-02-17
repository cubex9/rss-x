'use strict'

const Movie = require('./../data/Movie.js')
/**
 * ResolverApi is general item/movie resolving module api.
 *
 * @author kubasekA
 */
class Resolver {
    constructor ({conf, onInsertMovie, onInsertItem, onError}) {
        this.conf = conf

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

        this.db.item.one('id', t.id).callback((e, r) => {
            // when item is new, must be inserted into db
            if (e) {
                this.db.insertItem(t)

                // try check movie in db
                this.db.movie.one((b) => {
                    b.where('title', t.title)
                    b.where('year', t.year)

                    b.callback((e, r) => {
                        /* yes, movie exist, set movie to item and update him */
                        if (!e) {
                            this.resolveExistMovie(t, r)
                        } else {
                            this.resolveNewMovie(t)
                        }
                    })
                })
            } else {
                console.log(e)
            }
        })
    }

    /**
     * resolve movie from db
     *
     * @param t item
     * @param r result from db search
     */
    resolveExistMovie (t, r) {
        const m = Movie.fromJson(r)
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
        /* movie does not exist, check him from omdb */
        this.conf.movies.get(t, (e, r) => {
            if (!e) {
                const m = Movie.fromOmdb(r)
                this.db.insertMovie(m)

                t.movie = m.id
                this.db.update(t, {movie: m.id})

                this.onInsertMovie(m)
                this.onInsertItem(m, t)
            } else {
                // TODO: make onError call -> unresolved item
            }
        })
    }
}

module.exports = Resolver
