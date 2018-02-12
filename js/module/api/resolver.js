'use strict'

/**
 * ResolverApi is general resolving module api.
 *
 * @author kubasekA
 */
class ResolverApi {

    constructor({ conf, onInsertMovie, onInsertItem, onError}) {
        this.conf = conf

        this.onInsertMovie = onInsertMovie
        this.onInsertItem = onInsertItem
        this.onError = onError;
    }

    /**
     * Get the resolver name.
     */
    get name() {
        throw new Error('Resolver.name must be override')
    }

    /**
     * Convert item from original rss source to general application type.
     *
     * @param item
     */
    convert(item) {
        throw new Error('Resolver.convert must be override')
    }

    getMovie(t,callback) {
        this.conf.movies(t,callback)

    }

    get db() {
        this.conf.db
    }

    /**
     * resolve item in channel
     *
     * @param item
     */
    resolve(item) {

        /* new item */
        var t = this.convert(item)

        this.db.item.search('id',t.id).callback((e,r) => {

            // when item is new, must be inserted into db
            if(e) {
                this.db.insertItem(t);

                // try check movie in db
                this.db.movie.search((b) => {

                    b.where('title',t.title)
                    b.where('year', t.year)
                    b.callback((e,r) => {

                        /* yes, movie exist, set movie to item and update him */
                        if(!e) {

                            const m = Movie.fromJson(r)
                            t.movie = m.id

                            this.db.updateItem(t)

                            // now can call result
                            this.onInsertItem(m,t)

                        } else {

                            /* movie does not exist, check him from omdb */
                            this.conf.movies.get(t, (e,r) => {
                                if( !e) {

                                    const m = Movie.ofOmdb(r)
                                    this.db.insertMovie(m)

                                    t.movie = movie.id
                                    this.db.updateItem(t)

                                    this.onInsertMovie(m)
                                    this.onInsertItem(m,t)
                                } else {
                                    // TODO: make onError call -> unresolved item
                                }
                            })
                        }
                    })
                })
            } else {
                console.log(e);
            }
        })
    }
}

module.exports = ResolverApi;