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
        // TODO: unigue
        this.db.insert(i)
    }

    insertMovie(m) {
        // TODO: unique
        this.db.insert(m)
    }

    /**
     * Update database entry by data
     *
     * @param entry db entry which must have { type: '', id: }
     * @param data
     */
    update( entry, data ) {

        this.db.update(data).make( b => {

            b.where('type', dapi.type)
            b.where('id', dapi.id)

            b.callback( (err,count) =>
                console.log(`Entry ${dapi.id} was update by: ${JSON.stringify(data)}.`)
            )
        })
    }
}

module.exports = NosqlDatabase


