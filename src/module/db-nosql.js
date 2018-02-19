const DbApi = require('./api/db.js')
const DB = require('nosql')

const Deser = require('./data/Convertors.js')

/**
 * Nosql driver
 * @author kubasekA
 */
class NosqlDatabase extends DbApi {
    constructor (conf) {
        super()

        // this.db = DB.load(conf.db.path)
        this.db = DB.load('./data.nosql')

        /* create movie view */
        this.db.view('movie').make((b) => {
            b.where('type', 'movie')
            b.sort('year')
        })

        /* create item view */
        this.db.view('item').make((b) => {
            b.where('type', 'item')
            b.sort('year')
        })
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
    get movie () {
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
    get item () {
        return this.db.find('item')
    }

    /**
     * get the movie items
     *
     * @param movie
     * @param callback
     */
    itemsOfMovie (movie, maper) {
        console.log('items of:', movie)
        return this.item.search('movie', movie.id).callback((err, r) => {
            if (!err) {
                r.map((i) => maper(Deser.deserialize(i)))
            }
        })
    }

    /**
     * set item to db
     *
     * @param item
     */
    insertItem (i) {
        // TODO: unigue
        this.db.insert(i)
    }

    insertMovie (m) {
        // TODO: unique
        this.db.insert(m)
    }

    /**
     * Update database entry by data
     *
     * @param entry db entry which must have { type: '', id: }
     * @param data
     */
    update (entry, data) {
        this.db.update(data).make((b) => {
            b.where('type', entry.type)
            b.where('id', entry.id)

            b.callback((err, count) => {
                if (err) {
                    console.log('Error: {}', err)
                } else {
                    console.log('Entry {} was update by: {}', entry.id, JSON.stringify(data))
                }
            })
        })
    }
}

module.exports = NosqlDatabase
