'use strict'

/**
 * ResolverApi is general resolving module api.
 *
 * @author kubasekA
 */
class ResolverApi {

    constructor(opts, onRender, onError) {
        this.conf = opts.conf

        this.render = onRender
        this.error = onError;
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

    /**
     * resolve item in channel
     *
     * @param item
     */
    resolve(item) {

        var t = this.convert(item);

        if( !this.conf.db.itemExits(t.id)) {

            this.conf.db.movieByItem(t,
                (m) => {
                    m.addItem(t)
                    this.conf.db.updateMovie(m)
                },
                () => conf.omdb.get(t.title, t.year,
                    // sync ?
                    (m) => {
                        var movie = new Movie(m);

                        movie.addItem(t);
                        this.db.insertMovie(m);
                    }
                )
            )
        }
    }

    private resolvedMovie(m, i) {
        m.addItem(i);

        this.onRender(m);
    }

    onRender(movie) {
        this.render.movie(movie);
    }

    onError(item) {
        this.error(item)
    }
}

module.exports = ResolverApi;