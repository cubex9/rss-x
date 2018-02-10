const DataApi = require('./DataApi.js')
const Item = require('./RssItem.js')

/**
 * clone constructor, where movie is deserialized JSON of Movie
 *
 * @param movie
 * @returns {*|boolean}
 * @constructor
 */
class Movie extends DataApi {

    constructor(serialized) {
        super(serialized)

        /* no origin on start */
        this.omdb = null

        if( serialized != null ) {
            this.omdb = serialized.omdb

            this.items = new Array()
            serialized.items.forEach( i => this.items.push( new Item(i)))
        }
    }

    get type() {
        return 'movie'
    }

    /**
     * application own id
     */
    get id() {
        return this.omdb.imdbID
    }

    /**
     * object with information from omdb
     *
     * @type {Object}
     */
    get origin() {
        return this.omdb
    }

    /**
     *
     * @param val {Object}
     */
    set origin(val) {
        this.omdb = val
    }







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


}

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
