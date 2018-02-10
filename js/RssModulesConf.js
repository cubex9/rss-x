var conf = require('conf')

/**
 * Application configuration
 *
 * @param ser serialized configuration
 * @constructor
 */
class RssModulesConf extends conf {

    constructor(opts) {
        super(opts)

        /**
         * db initialization
         */
        var Database = require(`./module/db-${get('db.module', 'nosql')}.js`
        this.databaseModule = new Database()

        /**
         * files initialization
         */
        var Files = require(`./module/files-${get('files.module','local')}.js`)
        this.filesModule = new Files();
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
}

module.exports = RssModulesConf