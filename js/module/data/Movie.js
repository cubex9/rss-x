const DApi = require('./DApi.js')

/**
 * clone constructor, where movie is deserialized JSON of Movie
 *
 * @param serialized and deserialized JSON.object
 * @returns {*|boolean}
 * @constructor
 */
class Movie extends DApi {

    constructor(serialized) {
        super(serialized)

        /* no origin on start */
        this.origin = null

        /* on create */
        this.status = 'new'

        /* priority on start is default */
        this.priority = 0

        if( serialized != null ) {
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
    static fromOmdb(omdb) {
        return new Movie({ origin : data, status : 'new', priority : 0})
    }

    get type() {
        return 'movie'
    }

    /**
     * application own id
     */
    get id() {
        return this.origin.imdbID
    }

    /**
     * title of the movie
     */
    get title() {
        return this.origin.Title;
    }

    /**
     * release year
     */
    get year() {
        return this.origin.Year;
    }
}

module.exports = Movie