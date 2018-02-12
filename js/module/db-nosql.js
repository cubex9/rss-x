const DbApi = require('./api/db.js')
const DB = require('nosql')

const RssItem = require('./data/RssItem.js')
const Movie = require('./data/Movie.js')

class NosqlDatabase extends DbApi {

    constructor(conf) {
        super()

        this.db = DB.load(conf.db.path)

        /* create movie view */
        this.db.view('movie').make((b) => {
            b.where('type', 'movie')
            b.sort('year')
        });

        /* create item view */
        this.db.view('item').make((b) => {
            b.where('type', 'item')
            b.sort('year')
        });
    }

    /**
     * get movie view
     * <pre>
     *      db.movie.search('id',1).callback((err,res) => {
     *          if( !err) {
     *              console.log(res)
     *          }
     *      })
     * </pre>
     */
    get movie() {
        return this.db.find('movie')
    }

    /**
     * get movie view
     * <pre>
     *      db.item.search('id',1).callback((err,res) => {
     *          if( !err) {
     *              console.log(res)
     *          }
     *      })
     * </pre>
     */
    get item() {
        return this.db.find('item')
    }

    /**
     * get the movie items
     *
     * @param movie
     * @param callback
     */
    itemsOfMovie(movie,callback) {
        return this.items.search('movie',movie.id).callback(callback)
    }

    /**
     * set item to db
     *
     * @param item
     */
    insertItem(i) {
        this.db.insert(i)
    }

    insertMovie(m) {
        this.db.insert(m)
    }

    /**
     * set movie to db
     *
     * @param movie
     */
    updateMovie(movie) {

        this.db.update(movie).make((b) => {
            b.where('type','movie')
            b.where('id', movie.id);
            b.callback((err, count) => console.log('updated movie id:', movie.id))
        })
    }

    /**
     * update item
     *
     * @param movie
     */
    updateItem(movie) {

        this.db.update(movie).make((b) => {
            b.where('type', 'item')
            b.where('id', item.id)
            b.callback((err, count) => console.log('updated item id:', item.id))

        })
    }
}

module.exports = NosqlDatabase


