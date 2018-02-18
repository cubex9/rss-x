const Conf = require('conf')

/**
 * Application configuration
 *
 * @param ser serialized configuration
 * @constructor
 */
class RssModulesConf extends Conf {
    constructor (opts) {
        super(opts)

        /**
         * db initialization
         */
        const Database = require(`./module/${this.get('db.module', 'db-nosql.js')}`)
        this.databaseModule = new Database(opts)

        /**
         * files initialization
         */
        // const Files = require(`./module/${this.get('files.module', 'files-local.js')}`)
        this.filesModule = require(`./module/${this.get('files.module', 'files-local.js')}`)

        /**
         * omdb driver
         */
        this.omdb = require('./module/omdb-api.js')

        this.renderer = null
    }

    /**
     * get the db module name
     *
     * @returns {string}
     */
    get db () {
        return this.databaseModule
    }

    /**
     * get the files module name
     *
     * @returns {string}
     */
    get files () {
        return this.filesModule
    }

    /**
     * get the movie service driver
     *
     * @returns {OmbdDriver}
     */
    get movies () {
        return this.omdb
    }

    /**
     * get the subtitle service
     */
    get subtitles () {
        throw new Error('Not implemented yet.')
    }
}

module.exports = RssModulesConf
