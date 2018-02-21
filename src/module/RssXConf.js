const Conf = require('conf')
const log4js = require('log4js')

// const logger = log4js.getLogger('rssx')
// logger.info('App configuration was loader')

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
         * for information, on start check the path
         */
        console.log('CONF: ', this.path)
        log4js.configure(this.get('log4js'))

        /**
         * db initialization
         */
        const Database = require(`./${this.get('db.module', 'db-nosql.js')}`)
        this.databaseModule = new Database(opts)

        /**
         * files initialization
         */
        this.filesModule = require(`./${this.get('files.module', 'files-local.js')}`)

        /**
         * omdb driver
         */
        this.omdb = require('./omdb-api.js')

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
    get subtitle () {
        throw new Error('Not implemented yet.')
    }
}

module.exports = RssModulesConf
