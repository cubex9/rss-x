'use strict'

// const logger = require('@log4js-node/log4js-api').getLogger('rssx')
const Domo = require('./Domo')

/**
 * Default collor pallete.
 * This is used for collorify item.
 */
const defaultCollorSet = {
    ok: {
        color: 'green'
    },
    notbad: {
        color: 'yellow'
    },
    bad: {
        color: 'orange'
    },
    worst: {
        color: 'red'
    },
    gray: {
        color: '#aaaaaa'
    }
}

/**
 * This is set of filters which generate collor of Item.
 * Filers works like a matcher by rulles tray catch item, when
 * it is succefful give collor.
 */
class ColorFilter extends Domo {
    constructor (ser) {
        super(ser)

        /**
         * base colloer set of this filter set
         */
        this.collorSet = null

        if (ser == null || ser.collorSet == null) {
            this.collorSet = defaultCollorSet.clone()
        } else {
            this.collorSet = ser.collorSet
        }

        /**
         * filter array
         */
        this.filters = []
    }

    settings () {
        return this.collorSet
    }
}

module.exports = ColorFilter
