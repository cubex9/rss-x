/**
 * clone constructor, where movie is deserialized JSON of Movie
 *
 * @param movie
 * @returns {*|boolean}
 * @constructor
 */
Movie = function Movie(serialized) {

    /**
     * application own id
     */
    this.id = null;

    /**
     * object with information from omdb
     *
     * @type {Object}
     */
    this.origin = new Object()

    /**
     * array of rss-items by id
     *
     * @type {Object}
     */
    this.rss = new Array();

    /**
     * status can be: active, archived, deleted
     *
     * @type {string}
     */
    this.status = 'new';

    /**
     * zero is 'default', smaller has lover priority
     *
     * @type {number}
     */
    this.priority = 0;

    /**
     * fill inner with serialized data
     */
    if (movie != null) {
        this.origin = serialized.origin;
        this.rss = serialized.rss;
        this.status = serialized.status;
        this.priority = serialized.priority;

        /**
         * as it we use IMBd Id ( tt12345678 )
         */
        this.id = serialized.origin.imdbID;
    }

    /**
     * set origin, source from omdb.com
     *
     * @param origin
     */
    this.set = function(origin) {
        this.origin = origin;
    }

    /**
     * get original omdb data
     *
     * @returns {*}
     */
    this.get = function() {
        return origin;
    }

    /**
     * add link to rss item
     * @param item
     */
    this.addItem = function(item) {
        this.rss.push(item.id);
    }

    this.listItems = function() {
        return rss;
    }

    this.hasItem = function(id) {
        return rss.contains(id);
    }
}
