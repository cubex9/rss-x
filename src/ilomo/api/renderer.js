'use strict'

const logger = require('@log4js-node/log4js-api').getLogger('rssx')

class Rndr {
    constructor (cc) {
        this.container = cc
    }

    add (movie) {
    }

    update (movie, item) {
    }

    error (e) {
        logger.error('Error: {}', e)
    }
}

module.exports = Rndr
