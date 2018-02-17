var Conf = require('conf')

/**
 * Application configuration
 *
 * @param ser serialized configuration
 * @constructor
 */
class RssModulesConf extends Conf {

    constructor(opts) {
        super(opts)

        /**
         * db initialization
         */
        var Database = require(`./module/db-${get('db.module', 'nosql')}.js`)
        this.databaseModule = new Database(opts)

        /**
         * files initialization
         */
        var Files = require(`./module/files-${get('files.module','local')}.js`)
        this.filesModule = new Files(opts);

        /**
         * omdb driver
         */
        var OmdbDriver = require('./mocule/omdb-api.js')
        this.omdb = new OmbdDriver(opts)
    }

    /**
     * get the db module name
     *
     * @returns {string}
     */
    get db() {
        return this.databaseModule;
    }

    /**
     * get the files module name
     *
     * @returns {string}
     */
    get files() {
        return this.filesModule;
    }

    /**
     * get the movie service driver
     *
     * @returns {OmbdDriver}
     */
    get movies() {
        return this.omdb;
    }

    /**
     * get the subtitle service
     */
    get subtitles() {
        throw new Error("Not implemented yet.")
    }
}

module.exports = RssModulesConf