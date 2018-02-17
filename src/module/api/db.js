/**
 * Genereral Db Api of application,
 * database must be synchronized.
 *
 * All data entries must implement DApi
 *
 * @author kubasekA
 */
class DatabaseApi {
    /**
     * get item by id
     *
     * @param id
     * @return item
     */
    itemById (id) {
    }

    /**
     * get movie by id
     *
     * @param id
     * @return movie
     */
    movieById (id) {
    }

    /**
     * set item to db
     *
     * @param item
     */
    insertItem (item) {
    }

    updateItem (item) {
    }

    /**
     * set movie to db
     *
     * @param movie
     */
    insertMovie (movie) {
    }

    updateMovie (movie) {}

    /**
     * update db entry with data
     */
    update (entry, data) {
        throw new Error('Must be overriden.')
    }
}

module.exports = DatabaseApi()
