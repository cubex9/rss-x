'use strict'

/**
 * ResolverApi is general resolving module api.
 *
 * @author kubasekA
 */
class ResolverApi {

    constructor(opts) {
        this.conf = opts.conf;
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

        var t = convert(item);

        var stored = this.conf.db.getItem(item.id)

        if( stored == null ) {

            /* search movie */
            var movie = this.conf.db.movieByItem(t);

            if( movie == null ) {

                /* try search movie in omdb */
                var ombd = this.conf.search.movieByItem(t)
            }


        }
    }
}

module.exports = ResolverApi;