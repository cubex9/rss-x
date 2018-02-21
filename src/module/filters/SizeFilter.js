const Domo = require('./Domo.js')
const dotte = require('dot-prop')

/**
 * Filter make colors: green, yellow, orange, red.
 * Green is best, red is worst
 * @param {object} ser serialized filter
 */
class SizeFilter extends Domo {
    constructor (ser) {
        super(ser)

        this.type = 'filter'

        /**
         * filter class
         */
        this.filterType = 'SizeFilter'

        /**
         * setting of fitler is bite array
         */
        this.settings = 0

        /**
         * get key func = (object) => object.key
         */
        this.key = null

        if (ser != null) {
            this.settings = ser.settings
            this.key = ser.key
        }
    }

    colorOf (o) {
        const v = dotte.get(o, this.key)
        if (v >= 1 && v < 2) {
            return 'green'
        } else if (v > 0.5 && v < 3) {
            return 'yellow'
        } else if (v > 0.25 && v < 4) {
            return 'orange'
        }

        return 'red'
    }
}

module.exports = SizeFilter
