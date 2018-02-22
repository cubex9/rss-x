const Domo = require('./Domo.js')

/**
 * clone constructor, where movie is deserialized JSON of Movie
 *
 * @param serialized and deserialized JSON.object
 * @returns {*|boolean}
 * @constructor
 */
class Movie extends Domo {
    constructor (serialized) {
        super(serialized)

        this.guid = null

        /* no origin on start */
        this.origin = null

        /* on create */
        this.status = 'new'

        /* priority on start is default */
        this.priority = 0

        /* type is in super */
        this.type = 'movie'

        if (serialized != null) {
            this.guid = serialized.guid
            this.origin = serialized.origin
            this.status = serialized.status
            this.priority = serialized.priority
        }
    }

    /**
     * create movie from omdb
     * @param data
     * @returns {Movie}
     */
    static fromOmdb (data) {
        return new Movie({guid: data.imdbID, origin: data, status: 'new', priority: 0})
    }

    /**
     * application own id
     */
    get id () {
        return this.guid
    }

    /**
     * title of the movie
     */
    get title () {
        return this.origin.Title
    }

    /**
     * release year
     */
    get year () {
        return this.origin.Year
    }

    get director () {
        return this.origin.Director
    }

    get writer () {
        return this.origin.Writer
    }

    /**
     * @return plot
     */
    get plot () {
        return this.origin.Plot
    }

    /**
     * base rating
     */
    get ratting () {
        return this.origin.imdbRating
    }

    /**
     * link to poster image
     */
    get poster () {
        return this.origin.Poster
    }
}

module.exports = Movie
