'use strict'

const Filter = require('./../filtes/Filters')

/**
 * default color setting
 */
const __filter = new Filter()

module.exports = {
    /**
     * Get color of the object.
     * @param {Item|Movie} o this is an object for paint
     * @return {string} result color
     */
    colorify: function (o) {
        return __filter.colorify(o)
    }
}
