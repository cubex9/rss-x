const DbApi = require('./api/db.js')
const DB = require('nosql')

const RssItem = require('./data/RssItem.js')
const Movie = require('./data/Movie.js')

class NosqlDatabase extends DbApi {

    constructor(conf) {
        super()

        this.db = DB.load(conf.db.path)
    }

    /**
     * get item by id
     *
     * @param id
     * @return item
     */
    itemById(id) {
        const data = this.db.get('item.'+id)
        if( data != null ) {
            return new RssItem(data)
        }

        return null;
    }

    /**
     * get movie by id
     *
     * @param id
     * @return movie
     */
    movieById(id) {
        const data = this.db.get('movie.'+id)
        if( data != null ) {
            return new Movie(data);
        }

        return null;
    }

    /**
     * search movie by Name and Year
     */
    movieByTy(title,year) {

    }

    /**
     * set item to db
     *
     * @param item
     */
    insertItem(i) {
        this.db.set('item.'+i.id,i)
    }

    insertMovie(m) {
        this.db.set('movie.'+m.id,m);
    }

    /**
     * set movie to db
     *
     * @param movie
     */
    updateMovie(movie) {

    }

    updateMovie(movie) {}
}

module.exports = NosqlDatabase


